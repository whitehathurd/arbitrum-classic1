/*
 * Copyright 2019, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ethvalidator

import (
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/tls"
	"errors"
	"fmt"
	"log"
	"math"
	"net/http"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/gorilla/websocket"
	errors2 "github.com/pkg/errors"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/offchainlabs/arb-util/machine"
	"github.com/offchainlabs/arb-util/protocol"
	"github.com/offchainlabs/arb-util/value"

	"github.com/offchainlabs/arb-validator/ethbridge"
	"github.com/offchainlabs/arb-validator/hashing"
	"github.com/offchainlabs/arb-validator/valmessage"
)

type ValidatorLeaderRequest interface {
}

// type ValidatorMessageRequest interface {
//	msg vm.
//}

type LabeledFollowerResponse struct {
	address  common.Address
	response *valmessage.FollowerResponse
}

type ClientManager struct {
	clients         map[*Client]bool
	broadcast       chan *valmessage.ValidatorRequest
	register        chan *Client
	unregister      chan *Client
	waitRequestChan chan chan bool
	sigRequestChan  chan GatherSignatureRequest
	waitingChans    map[chan bool]bool
	responses       map[[32]byte]chan LabeledFollowerResponse

	key        *ecdsa.PrivateKey
	vmID       [32]byte
	validators map[common.Address]validatorInfo
}

func NewClientManager(key *ecdsa.PrivateKey, vmID [32]byte, validators map[common.Address]validatorInfo) *ClientManager {
	return &ClientManager{
		clients:         make(map[*Client]bool),
		broadcast:       make(chan *valmessage.ValidatorRequest, 10),
		register:        make(chan *Client, 10),
		unregister:      make(chan *Client, 10),
		waitRequestChan: make(chan chan bool, 128),
		sigRequestChan:  make(chan GatherSignatureRequest, 10),
		waitingChans:    make(map[chan bool]bool),
		responses:       make(map[[32]byte]chan LabeledFollowerResponse),
		key:             key,
		vmID:            vmID,
		validators:      validators,
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (m *ClientManager) RunServer() error {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		c, err := func() (*Client, error) {
			conn, err := upgrader.Upgrade(w, r, nil)
			if err != nil {
				return nil, err
			}
			tlsCon, ok := conn.UnderlyingConn().(*tls.Conn)
			if !ok {
				return nil, errors.New("made non tls connection")
			}

			_, signedUnique, err := conn.ReadMessage()
			if err != nil {
				return nil, errors2.Wrap(err, "failed to get message from follower")
			}
			uniqueVal := tlsCon.ConnectionState().TLSUnique
			hashVal := crypto.Keccak256(uniqueVal)
			pubkey, err := crypto.SigToPub(hashVal, signedUnique)
			if err != nil {
				return nil, err
			}
			address := crypto.PubkeyToAddress(*pubkey)
			if _, ok := m.validators[address]; !ok {
				return nil, errors.New("follower tried to connect with bad pubkey")
			}
			sigData, err := crypto.Sign(hashVal, m.key)
			if err != nil {
				return nil, err
			}
			wr, err := conn.NextWriter(websocket.BinaryMessage)
			if err != nil {
				return nil, err
			}
			if _, err := wr.Write(m.vmID[:]); err != nil {
				return nil, err
			}

			if _, err := wr.Write(sigData); err != nil {
				return nil, err
			}

			if err := wr.Close(); err != nil {
				return nil, err
			}
			return NewClient(conn, address), nil
		}()
		if err != nil {
			log.Printf("Coordinator failed to connet with follower: %v\n", err)
			return
		}

		log.Println("Coordinator connected with follower", hexutil.Encode(c.Address[:]))
		m.register <- c

		go func() {
			if err := c.run(); err != nil {
				log.Printf("Coordinator lost connection to client with error: %v\n", err)
			}
			m.unregister <- c
		}()
	})
	return http.ListenAndServeTLS(":1236", "server.crt", "server.key", nil)
}

type GatherSignatureRequest struct {
	request      *valmessage.ValidatorRequest
	responseChan chan LabeledFollowerResponse
	requestID    [32]byte
}

func (m *ClientManager) Run() {
	aggResponseChan := make(chan LabeledFollowerResponse, 32)
	for {
		select {
		case waitRequest := <-m.waitRequestChan:
			if len(m.clients) == len(m.validators)-1 {
				waitRequest <- true
			} else {
				m.waitingChans[waitRequest] = true
			}
		case response := <-aggResponseChan:
			m.responses[value.NewHashFromBuf(response.response.RequestId)] <- response
		case request := <-m.sigRequestChan:
			m.broadcast <- request.request
			m.responses[request.requestID] = request.responseChan
		case client := <-m.register:
			m.clients[client] = true
			go func() {
				for message := range client.FromClient {
					response := new(valmessage.FollowerResponse)
					err := proto.Unmarshal(message, response)
					if err != nil {
						log.Println("Recieved bad message from follower")
						continue
					}
					aggResponseChan <- LabeledFollowerResponse{client.Address, response}
				}
			}()
			if len(m.clients) == len(m.validators)-1 {
				for waitChan := range m.waitingChans {
					waitChan <- true
				}
				m.waitingChans = make(map[chan bool]bool)
			}
		case client := <-m.unregister:
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				close(client.ToClient)
			}
		case message := <-m.broadcast:
			raw, err := proto.Marshal(message)
			if err != nil {
				continue
			}
			for client := range m.clients {
				select {
				case client.ToClient <- raw:
				default:
					close(client.ToClient)
					delete(m.clients, client)
				}
			}
		}
	}
}

func (m *ClientManager) gatherSignatures(
	request *valmessage.ValidatorRequest,
	requestID [32]byte,
) []LabeledFollowerResponse {
	responseChan := make(chan LabeledFollowerResponse, len(m.validators)-1)
	log.Println("Coordinator gathering signatures")
	m.sigRequestChan <- GatherSignatureRequest{
		request,
		responseChan,
		requestID,
	}
	responseList := make([]LabeledFollowerResponse, 0, len(m.validators)-1)
	timer := time.NewTimer(20 * time.Second)
	timedOut := false
	defer timer.Stop()
	for {
		select {
		case response := <-responseChan:
			responseList = append(responseList, response)
		case <-timer.C:
			log.Println("Coordinator timed out gathering signatures")
			timedOut = true
		}
		if len(responseList) == len(m.validators)-1 || timedOut {
			break
		}
	}
	return responseList
}

func (m *ClientManager) WaitForFollowers(timeout time.Duration) bool {
	waitChan := make(chan bool, 1)
	m.waitRequestChan <- waitChan
	select {
	case <-waitChan:
		return true
	case <-time.After(timeout):
		return false
	}
}

type OffchainMessage struct {
	Message   protocol.Message
	Hash      []byte
	Signature []byte
}

func (m *MessageProcessingQueue) Fetch() chan []OffchainMessage {
	retChan := make(chan []OffchainMessage, 1)
	m.requests <- retChan
	return retChan
}

func (m *MessageProcessingQueue) HasMessages() chan bool {
	retChan := make(chan bool, 1)
	m.requests <- retChan
	return retChan
}

func (m *MessageProcessingQueue) Return(messages []OffchainMessage) {
	m.requests <- messages
}

func (m *MessageProcessingQueue) Send(message OffchainMessage) {
	m.requests <- message
}

type MessageProcessingQueue struct {
	queuedMessages []OffchainMessage
	requests       chan interface{}
}

func NewMessageProcessingQueue() *MessageProcessingQueue {
	return &MessageProcessingQueue{
		queuedMessages: make([]OffchainMessage, 0),
		requests:       make(chan interface{}, 10),
	}
}

func (m *MessageProcessingQueue) run() {
	go func() {
		for {
			request := <-m.requests
			switch request := request.(type) {
			case chan []OffchainMessage:
				request <- m.queuedMessages
				m.queuedMessages = nil
			case []OffchainMessage:
				m.queuedMessages = append(request, m.queuedMessages...)
			case OffchainMessage:
				m.queuedMessages = append(m.queuedMessages, request)
			case chan bool:
				request <- len(m.queuedMessages) > 0
			default:
				log.Fatalf("Unhandled request type %T\n", request)
			}
		}
	}()
}

type ValidatorCoordinator struct {
	Val *EthValidator
	cm  *ClientManager

	requestChan chan ValidatorLeaderRequest

	mpq               *MessageProcessingQueue
	maxStepsUnanSteps int32
}

func NewCoordinator(
	name string,
	machine machine.Machine,
	key *ecdsa.PrivateKey,
	config *valmessage.VMConfiguration,
	challengeEverything bool,
	maxCallSteps int32,
	connectionInfo ethbridge.ArbAddresses,
	ethURL string,
	maxStepsUnanSteps int32,
) (*ValidatorCoordinator, error) {
	var vmID [32]byte
	_, err := rand.Read(vmID[:])
	if err != nil {
		log.Fatal(err)
	}

	c, err := NewEthValidator(name, vmID, machine, key, config, challengeEverything, maxCallSteps, connectionInfo, ethURL)
	if err != nil {
		return nil, err
	}
	return &ValidatorCoordinator{
		Val:               c,
		cm:                NewClientManager(key, vmID, c.Validators),
		requestChan:       make(chan ValidatorLeaderRequest, 10),
		mpq:               NewMessageProcessingQueue(),
		maxStepsUnanSteps: maxStepsUnanSteps,
	}, nil
}

func (m *ValidatorCoordinator) SendMessage(msg OffchainMessage) {
	m.mpq.Send(msg)
}

func (m *ValidatorCoordinator) Run() error {
	go func() {
		err := m.cm.RunServer()
		fmt.Println("Running server", err)
		if err != nil {
			log.Fatal(err)
		}
	}()
	go m.mpq.run()
	go m.cm.Run()
	if err := m.Val.StartListening(); err != nil {
		return err
	}
	go func() {
		pendingForProcessing := false
		for {
			select {
			case request := <-m.requestChan:
				switch request := request.(type) {
				case CoordinatorCreateRequest:
					ret, err := m.createVMImpl(request.timeout)
					if err != nil {
						request.errChan <- err
					} else {
						request.retChan <- ret
					}
				case CoordinatorDisputableRequest:
					request.retChan <- m.initiateDisputableAssertionImpl()
				case CoordinatorUnanimousRequest:
					err := m.initiateUnanimousAssertionImpl(request.final, m.maxStepsUnanSteps)
					if err != nil {
						request.errChan <- err
					} else {
						pendingForProcessing = false
						request.retChan <- request.final
					}
				}
			case <-time.After(time.Second):
				shouldUnan := false
				forceFinal := false
				newPending := false
				if <-m.Val.Bot.HasPendingMessages() {
					// Force onchain assertion if there are pending on chain messages, then force an offchain assertion
					shouldUnan = true
					forceFinal = true
					newPending = true
				} else if <-m.mpq.HasMessages() || pendingForProcessing {
					shouldUnan = true
					forceFinal = false
					newPending = false
				}

				if shouldUnan {
					err := m.initiateUnanimousAssertionImpl(forceFinal, m.maxStepsUnanSteps)
					if err != nil {
						log.Println("Coordinator hit problem and is closing channel")
						closedChan := m.Val.Bot.CloseUnanimousAssertionRequest()

						closed := <-closedChan
						if closed {
							log.Println("Coordinator successfully closed channel")
						} else {
							log.Println("Coordinator failed to close channel")
						}
					} else {
						pendingForProcessing = newPending
					}
				}
			}
		}
	}()
	return nil
}

type CoordinatorCreateRequest struct {
	timeout time.Duration
	retChan chan bool
	errChan chan error
}

type CoordinatorDisputableRequest struct {
	retChan chan bool
}

type CoordinatorUnanimousRequest struct {
	final   bool
	retChan chan bool
	errChan chan error
}

func (m *ValidatorCoordinator) CreateVM(timeout time.Duration) (chan bool, chan error) {
	retChan := make(chan bool, 1)
	errChan := make(chan error, 1)
	m.requestChan <- CoordinatorCreateRequest{timeout, retChan, errChan}
	return retChan, errChan
}

func (m *ValidatorCoordinator) InitiateDisputableAssertion() chan bool {
	resChan := make(chan bool, 1)
	m.requestChan <- CoordinatorDisputableRequest{resChan}
	return resChan
}

func (m *ValidatorCoordinator) InitiateUnanimousAssertion(final bool) (chan bool, chan error) {
	retChan := make(chan bool, 1)
	errChan := make(chan error, 1)
	m.requestChan <- CoordinatorUnanimousRequest{final, retChan, errChan}
	return retChan, errChan
}

func (m *ValidatorCoordinator) createVMImpl(timeout time.Duration) (bool, error) {
	gotAll := m.cm.WaitForFollowers(timeout)
	if !gotAll {
		return false, errors.New("coordinator can only create VM when connected to all other validators")
	}

	notifyFollowers := func(allSigned bool) {
		m.cm.broadcast <- &valmessage.ValidatorRequest{
			Request: &valmessage.ValidatorRequest_CreateNotification{
				CreateNotification: &valmessage.CreateVMFinalizedValidatorNotification{
					Approved: allSigned,
				},
			},
		}
	}
	stateDataChan := m.Val.Bot.RequestVMState()
	stateData := <-stateDataChan
	createData := &valmessage.CreateVMValidatorRequest{
		Config:              &stateData.Config,
		VmId:                value.NewHashBuf(m.Val.VmId),
		VmState:             value.NewHashBuf(stateData.MachineState),
		ChallengeManagerNum: 0,
	}
	createHash := hashing.CreateVMHash(createData)

	responses := m.cm.gatherSignatures(
		&valmessage.ValidatorRequest{
			Request: &valmessage.ValidatorRequest_Create{Create: createData},
		},
		createHash,
	)
	if len(responses) != m.Val.ValidatorCount()-1 {
		notifyFollowers(false)
		return false, errors.New("some Validators didn't respond")
	}

	signatures := make([][]byte, m.Val.ValidatorCount())
	var err error
	signatures[m.Val.Validators[m.Val.Address()].indexNum], err = m.Val.Sign(createHash)
	if err != nil {
		return false, err
	}
	for _, response := range responses {
		r := response.response.Response.(*valmessage.FollowerResponse_Create).Create
		if !r.Accepted {
			return false, errors.New("some Validators refused to sign")
		}
		signatures[m.Val.Validators[response.address].indexNum] = r.Signature
	}
	_, err = m.Val.CreateVM(createData, signatures)
	return true, err
}

func (m *ValidatorCoordinator) initiateDisputableAssertionImpl() bool {
	start := time.Now()
	resultChan := m.Val.Bot.RequestDisputableAssertion(10000)
	res := <-resultChan

	if res {
		log.Printf("Coordinator made disputable assertion in %s seconds", time.Since(start))
	} else {
		log.Printf("Disputable assertion failed")
	}
	return res
}

func (m *ValidatorCoordinator) initiateUnanimousAssertionImpl(forceFinal bool, maxSteps int32) error {
	queuedMessages := <-m.mpq.Fetch()

	wasFinal, err := m._initiateUnanimousAssertionImpl(queuedMessages, forceFinal, maxSteps)
	if err != nil {
		m.mpq.Return(queuedMessages)
		return err
	}

	if wasFinal {
		log.Println("Coordinator is closing unanimous assertion")
		closedChan := m.Val.Bot.CloseUnanimousAssertionRequest()

		closed := <-closedChan
		if closed {
			log.Println("Coordinator successfully closed channel")
		} else {
			log.Println("Coordinator failed to close channel")
		}
	} else {
		log.Println("Coordinator is keeping unanimous assertion chain open")
	}
	return nil
}

func (m *ValidatorCoordinator) _initiateUnanimousAssertionImpl(queuedMessages []OffchainMessage, forceFinal bool, maxSteps int32) (bool, error) {
	log.Println("Coordinator making unanimous assertion with", len(queuedMessages), "messages")
	newMessages := make([]protocol.Message, 0, len(queuedMessages))
	messageHashes := make([][]byte, 0, len(newMessages))
	for _, msg := range queuedMessages {
		newMessages = append(newMessages, msg.Message)
		messageHashes = append(messageHashes, msg.Hash)
	}

	start := time.Now()
	requestChan, resultsChan, unanErrChan := m.Val.Bot.InitiateUnanimousRequest(10000, newMessages, messageHashes, forceFinal, maxSteps)
	responsesChan := make(chan []LabeledFollowerResponse, 1)

	var unanRequest valmessage.UnanimousRequest
	select {
	case unanRequest = <-requestChan:
		break
	case err := <-unanErrChan:
		return false, err
	}

	requestMessages := make([]*valmessage.SignedMessage, 0, len(unanRequest.NewMessages))
	for i, msg := range unanRequest.NewMessages {
		requestMessages = append(requestMessages, &valmessage.SignedMessage{
			Message:   protocol.NewMessageBuf(msg),
			Signature: queuedMessages[i].Signature,
		})
	}
	hashId := unanRequest.Hash()

	notifyFollowers := func(msg *valmessage.UnanimousAssertionValidatorNotification) {
		m.cm.broadcast <- &valmessage.ValidatorRequest{
			RequestId: value.NewHashBuf(hashId),
			Request:   &valmessage.ValidatorRequest_UnanimousNotification{UnanimousNotification: msg},
		}
	}

	go func() {
		request := &valmessage.UnanimousAssertionValidatorRequest{
			BeforeHash:     value.NewHashBuf(unanRequest.BeforeHash),
			BeforeInbox:    value.NewHashBuf(unanRequest.BeforeInbox),
			SequenceNum:    unanRequest.SequenceNum,
			TimeBounds:     protocol.NewTimeBoundsBuf(unanRequest.TimeBounds),
			SignedMessages: requestMessages,
		}
		responsesChan <- m.cm.gatherSignatures(
			&valmessage.ValidatorRequest{
				RequestId: value.NewHashBuf(hashId),
				Request: &valmessage.ValidatorRequest_Unanimous{
					Unanimous: request,
				},
			},
			hashId,
		)
	}()

	var unanUpdate valmessage.UnanimousUpdateResults
	select {
	case unanUpdate = <-resultsChan:
		break
	case err := <-unanErrChan:
		notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
			Accepted: false,
		})
		return false, err
	}

	// Force onchain assertion if there are outgoing messages
	if len(unanUpdate.Assertion.OutMsgs) > 0 {
		unanUpdate.SequenceNum = math.MaxUint64
	}
	unanHash, err := m.Val.UnanimousAssertHash(
		unanUpdate.SequenceNum,
		unanUpdate.BeforeHash,
		unanUpdate.TimeBounds,
		unanUpdate.NewInboxHash,
		unanUpdate.OriginalInboxHash,
		unanUpdate.Assertion,
	)
	if err != nil {
		log.Println("Coordinator failed to hash unanimous assertion")
		notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
			Accepted: false,
		})
		return false, err
	}
	sig, err := m.Val.Sign(unanHash)
	if err != nil {
		log.Println("Coordinator failed to sign unanimous assertion")
		notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
			Accepted: false,
		})
		return false, err
	}

	responses := <-responsesChan
	if len(responses) != m.Val.ValidatorCount()-1 {
		log.Println("Coordinator failed to collect unanimous assertion sigs")
		notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
			Accepted: false,
		})
		return false, errors.New("some Validators didn't respond")
	}

	signatures := make([][]byte, m.Val.ValidatorCount())
	signatures[m.Val.Validators[m.Val.Address()].indexNum] = sig
	for _, response := range responses {
		r := response.response.Response.(*valmessage.FollowerResponse_Unanimous).Unanimous
		if !r.Accepted {
			notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
				Accepted: false,
			})
			return false, errors.New("some Validators refused to sign")
		}
		if value.NewHashFromBuf(r.AssertionHash) != unanHash {
			notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
				Accepted: false,
			})
			return false, errors.New("some Validators signed the wrong assertion")
		}
		signatures[m.Val.Validators[response.address].indexNum] = r.Signature
	}

	elapsed := time.Since(start)
	log.Printf("Coordinator succeeded signing unanimous assertion in %s\n", elapsed)
	notifyFollowers(&valmessage.UnanimousAssertionValidatorNotification{
		Accepted:   true,
		Signatures: signatures,
	})

	unanRequest.SequenceNum = unanUpdate.SequenceNum

	confRetChan, confErrChan := m.Val.Bot.ConfirmOffchainUnanimousAssertion(
		unanRequest.UnanimousRequestData,
		signatures,
	)

	select {
	case <-confRetChan:
		break
	case err := <-confErrChan:
		return false, err
	}
	return unanUpdate.SequenceNum == math.MaxUint64, nil
}