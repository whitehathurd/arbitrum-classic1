/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import type { TestArbCustomToken } from '../TestArbCustomToken'

export class TestArbCustomToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(
    _bridge: string,
    _l1Address: string,
    overrides?: Overrides
  ): Promise<TestArbCustomToken> {
    return super.deploy(
      _bridge,
      _l1Address,
      overrides || {}
    ) as Promise<TestArbCustomToken>
  }
  getDeployTransaction(
    _bridge: string,
    _l1Address: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_bridge, _l1Address, overrides || {})
  }
  attach(address: string): TestArbCustomToken {
    return super.attach(address) as TestArbCustomToken
  }
  connect(signer: Signer): TestArbCustomToken__factory {
    return super.connect(signer) as TestArbCustomToken__factory
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestArbCustomToken {
    return new Contract(address, _abi, signerOrProvider) as TestArbCustomToken
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_bridge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_l1Address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approveAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'approveAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bridge',
    outputs: [
      {
        internalType: 'contract ArbTokenBridge',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'bridgeBurn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'bridgeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'decimals',
        type: 'uint8',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'l1Address',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'nonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'someWackyCustomStuff',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'transferAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'transferFromAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFromAndCall',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x60806040523480156200001157600080fd5b506040516200303838038062003038833981810160405260408110156200003757600080fd5b50805160209182015160fe80546001600160a01b038085166001600160a01b03199283161790925560ff805492841692909116919091179055604080518082018252600f81526e2a32b9ba21bab9ba37b6aa37b5b2b760891b818601528151808301909252600482526321a0a92160e11b8286015292939192620000ca92909190601290620009e8620000d2821b17901c565b5050620009d9565b600054610100900460ff1680620000f75750620000f76001600160e01b03620001d816565b8062000106575060005460ff16155b620001435760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff161580156200016f576000805460ff1961ff0019909116610100171660011790555b62000183846001600160e01b03620001f716565b6200019884846001600160e01b03620002fd16565b620001ab6001600160e01b03620003da16565b620001bf826001600160e01b03620004a016565b8015620001d2576000805461ff00191690555b50505050565b6000620001f030620004b660201b6200113d1760201c565b1590505b90565b600054610100900460ff16806200021c57506200021c6001600160e01b03620001d816565b806200022b575060005460ff16155b620002685760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff1615801562000294576000805460ff1961ff0019909116610100171660011790555b620002a76001600160e01b03620004bc16565b620002d282604051806040016040528060018152602001603160f81b8152506200056d60201b60201c565b620002e6826001600160e01b036200063e16565b8015620002f9576000805461ff00191690555b5050565b600054610100900460ff1680620003225750620003226001600160e01b03620001d816565b8062000331575060005460ff16155b6200036e5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff161580156200039a576000805460ff1961ff0019909116610100171660011790555b620003ad6001600160e01b03620004bc16565b620003c283836001600160e01b036200070d16565b8015620003d5576000805461ff00191690555b505050565b600054610100900460ff1680620003ff5750620003ff6001600160e01b03620001d816565b806200040e575060005460ff16155b6200044b5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff1615801562000477576000805460ff1961ff0019909116610100171660011790555b6200048a6001600160e01b03620007fa16565b80156200049d576000805461ff00191690555b50565b6038805460ff191660ff92909216919091179055565b3b151590565b600054610100900460ff1680620004e15750620004e16001600160e01b03620001d816565b80620004f0575060005460ff16155b6200052d5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff161580156200048a576000805460ff1961ff00199091166101001716600117905580156200049d576000805461ff001916905550565b600054610100900460ff1680620005925750620005926001600160e01b03620001d816565b80620005a1575060005460ff16155b620005de5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff161580156200060a576000805460ff1961ff0019909116610100171660011790555b82516020808501919091208351918401919091206065919091556066558015620003d5576000805461ff0019169055505050565b600054610100900460ff1680620006635750620006636001600160e01b03620001d816565b8062000672575060005460ff16155b620006af5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff16158015620006db576000805460ff1961ff0019909116610100171660011790555b60405180605262002fb88239604051908190036052019020609a55508015620002f9576000805461ff00191690555050565b600054610100900460ff1680620007325750620007326001600160e01b03620001d816565b8062000741575060005460ff16155b6200077e5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff16158015620007aa576000805460ff1961ff0019909116610100171660011790555b8251620007bf90603690602086019062000937565b508151620007d590603790602085019062000937565b506038805460ff191660121790558015620003d5576000805461ff0019169055505050565b600054610100900460ff16806200081f57506200081f6001600160e01b03620001d816565b806200082e575060005460ff16155b6200086b5760405162461bcd60e51b815260040180806020018281038252602e8152602001806200300a602e913960400191505060405180910390fd5b600054610100900460ff1615801562000897576000805460ff1961ff0019909116610100171660011790555b6200048a6301ffc9a760e01b6001600160e01b03620008b216565b6001600160e01b0319808216141562000912576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b031916600090815260cc60205260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200097a57805160ff1916838001178555620009aa565b82800160010185558215620009aa579182015b82811115620009aa5782518255916020019190600101906200098d565b50620009b8929150620009bc565b5090565b620001f491905b80821115620009b85760008155600101620009c3565b6125cf80620009e96000396000f3fe608060405234801561001057600080fd5b50600436106101845760003560e01c80637ecebe00116100d9578063c2eeeebd11610087578063c2eeeebd14610720578063cae9ca5114610744578063d505accf146107fd578063d8fbe9941461084e578063dd62ed3e14610884578063e78cea92146108b2578063f3fef3a3146108ba57610184565b80637ecebe00146105a25780638c2a993e146105c857806395d89b41146105f4578063a457c2d7146105fc578063a708acce14610628578063a9059cbb14610630578063c1d34b891461065c57610184565b8063313ce56711610136578063313ce567146104195780633177029f146104375780633644e51514610463578063395093511461046b5780634000aea01461049757806370a082311461055057806374f4f5471461057657610184565b806301ffc9a71461018957806306fdde03146101c4578063095ea7b3146102415780631296ee621461026d5780631624f6c61461029957806318160ddd146103c957806323b872dd146103e3575b600080fd5b6101b06004803603602081101561019f57600080fd5b50356001600160e01b0319166108e6565b604080519115158252519081900360200190f35b6101cc610911565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102065781810151838201526020016101ee565b50505050905090810190601f1680156102335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101b06004803603604081101561025757600080fd5b506001600160a01b0381351690602001356109a8565b6101b06004803603604081101561028357600080fd5b506001600160a01b0381351690602001356109c5565b6103c7600480360360608110156102af57600080fd5b810190602081018135600160201b8111156102c957600080fd5b8201836020820111156102db57600080fd5b803590602001918460018302840111600160201b831117156102fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561034e57600080fd5b82018360208201111561036057600080fd5b803590602001918460018302840111600160201b8311171561038157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506109e89050565b005b6103d1610ab1565b60408051918252519081900360200190f35b6101b0600480360360608110156103f957600080fd5b506001600160a01b03813581169160208101359091169060400135610ab7565b610421610b44565b6040805160ff9092168252519081900360200190f35b6101b06004803603604081101561044d57600080fd5b506001600160a01b038135169060200135610b4d565b6103d1610b69565b6101b06004803603604081101561048157600080fd5b506001600160a01b038135169060200135610b78565b6101b0600480360360608110156104ad57600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b8111156104dc57600080fd5b8201836020820111156104ee57600080fd5b803590602001918460018302840111600160201b8311171561050f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610bcc945050505050565b6103d16004803603602081101561056657600080fd5b50356001600160a01b0316610c27565b6103c76004803603604081101561058c57600080fd5b506001600160a01b038135169060200135610c42565b6103d1600480360360208110156105b857600080fd5b50356001600160a01b0316610c9d565b6103c7600480360360408110156105de57600080fd5b506001600160a01b038135169060200135610cbe565b6101cc610d15565b6101b06004803603604081101561061257600080fd5b506001600160a01b038135169060200135610d76565b6103c7610de4565b6101b06004803603604081101561064657600080fd5b506001600160a01b038135169060200135610de6565b6101b06004803603608081101561067257600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b8111156106ac57600080fd5b8201836020820111156106be57600080fd5b803590602001918460018302840111600160201b831117156106df57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610dfa945050505050565b610728610e5b565b604080516001600160a01b039092168252519081900360200190f35b6101b06004803603606081101561075a57600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561078957600080fd5b82018360208201111561079b57600080fd5b803590602001918460018302840111600160201b831117156107bc57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610e6a945050505050565b6103c7600480360360e081101561081357600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610ebd565b6101b06004803603606081101561086457600080fd5b506001600160a01b03813581169160208101359091169060400135611055565b6103d16004803603604081101561089a57600080fd5b506001600160a01b0381358116916020013516611072565b61072861109d565b6103c7600480360360408110156108d057600080fd5b506001600160a01b0381351690602001356110ac565b60006001600160e01b0319821663b0202a1160e01b148061090b575061090b82611143565b92915050565b60368054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561099d5780601f106109725761010080835404028352916020019161099d565b820191906000526020600020905b81548152906001019060200180831161098057829003601f168201915b505050505090505b90565b60006109bc6109b5611162565b8484611166565b50600192915050565b60006109e1838360405180602001604052806000815250610bcc565b9392505050565b600054610100900460ff1680610a015750610a01611252565b80610a0f575060005460ff16155b610a4a5760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff16158015610a75576000805460ff1961ff0019909116610100171660011790555b610a7e84611263565b610a888484611339565b610a906113ef565b610a9982611499565b8015610aab576000805461ff00191690555b50505050565b60355490565b6000610ac48484846114af565b610b3a84610ad0611162565b610b35856040518060600160405280602881526020016124c3602891396001600160a01b038a16600090815260346020526040812090610b0e611162565b6001600160a01b03168152602081019190915260400160002054919063ffffffff61160616565b611166565b5060019392505050565b60385460ff1690565b60006109e1838360405180602001604052806000815250610e6a565b6000610b7361169d565b905090565b60006109bc610b85611162565b84610b358560346000610b96611162565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff6116d016565b6000610bd88484610de6565b50610bec610be4611162565b85858561172a565b610b3a5760405162461bcd60e51b81526004018080602001828103825260268152602001806123fb6026913960400191505060405180910390fd5b6001600160a01b031660009081526033602052604090205490565b60fe546001600160a01b03163314610c8f576040805162461bcd60e51b815260206004820152600b60248201526a4f4e4c595f42524944474560a81b604482015290519081900360640190fd5b610c998282611881565b5050565b6001600160a01b038116600090815260996020526040812061090b90611977565b60fe546001600160a01b03163314610d0b576040805162461bcd60e51b815260206004820152600b60248201526a4f4e4c595f42524944474560a81b604482015290519081900360640190fd5b610c99828261197b565b60378054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561099d5780601f106109725761010080835404028352916020019161099d565b60006109bc610d83611162565b84610b35856040518060600160405280602581526020016125756025913960346000610dad611162565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff61160616565b565b60006109bc610df3611162565b84846114af565b6000610e07858585610ab7565b50610e148585858561172a565b610e4f5760405162461bcd60e51b81526004018080602001828103825260268152602001806123fb6026913960400191505060405180910390fd5b5060015b949350505050565b60ff546001600160a01b031681565b6000610e7684846109a8565b50610e82848484611a67565b610b3a5760405162461bcd60e51b815260040180806020018281038252602581526020018061233c6025913960400191505060405180910390fd5b83421115610f12576040805162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015290519081900360640190fd5b6000609a54888888610f47609960008e6001600160a01b03166001600160a01b03168152602001908152602001600020611977565b604080516020808201979097526001600160a01b0395861681830152939094166060840152608083019190915260a082015260c08082018990528251808303909101815260e0909101909152805191012090506000610fa582611ba3565b90506000610fb582878787611bef565b9050896001600160a01b0316816001600160a01b03161461101d576040805162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b6001600160a01b038a16600090815260996020526040902061103e90611d5a565b6110498a8a8a611166565b50505050505050505050565b6000610e5384848460405180602001604052806000815250610dfa565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b60fe546001600160a01b031681565b60fe5460ff5460408051630b620b8160e01b81526001600160a01b03928316600482015233602482015285831660448201526064810185905290519190921691630b620b819160848083019260209291908290030181600087803b15801561111357600080fd5b505af1158015611127573d6000803e3d6000fd5b505050506040513d6020811015610aab57600080fd5b3b151590565b6001600160e01b031916600090815260cc602052604090205460ff1690565b3390565b6001600160a01b0383166111ab5760405162461bcd60e51b81526004018080602001828103825260248152602001806125516024913960400191505060405180910390fd5b6001600160a01b0382166111f05760405162461bcd60e51b815260040180806020018281038252602281526020018061231a6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260346020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600061125d3061113d565b15905090565b600054610100900460ff168061127c575061127c611252565b8061128a575060005460ff16155b6112c55760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff161580156112f0576000805460ff1961ff0019909116610100171660011790555b6112f8611d63565b61131b82604051806040016040528060018152602001603160f81b815250611e03565b61132482611ec3565b8015610c99576000805461ff00191690555050565b600054610100900460ff16806113525750611352611252565b80611360575060005460ff16155b61139b5760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff161580156113c6576000805460ff1961ff0019909116610100171660011790555b6113ce611d63565b6113d88383611f80565b80156113ea576000805461ff00191690555b505050565b600054610100900460ff16806114085750611408611252565b80611416575060005460ff16155b6114515760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff1615801561147c576000805460ff1961ff0019909116610100171660011790555b611484612058565b8015611496576000805461ff00191690555b50565b6038805460ff191660ff92909216919091179055565b6001600160a01b0383166114f45760405162461bcd60e51b815260040180806020018281038252602581526020018061252c6025913960400191505060405180910390fd5b6001600160a01b0382166115395760405162461bcd60e51b81526004018080602001828103825260238152602001806122d56023913960400191505060405180910390fd5b6115448383836113ea565b61158781604051806060016040528060268152602001612361602691396001600160a01b038616600090815260336020526040902054919063ffffffff61160616565b6001600160a01b0380851660009081526033602052604080822093909355908416815220546115bc908263ffffffff6116d016565b6001600160a01b0380841660008181526033602090815260409182902094909455805185815290519193928716926000805160206124eb83398151915292918290030190a3505050565b600081848411156116955760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561165a578181015183820152602001611642565b50505050905090810190601f1680156116875780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000610b73604051808061247160529139605201905060405180910390206116c36120f5565b6116cb6120fb565b612101565b6000828201838110156109e1576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600061173e846001600160a01b031661113d565b61174a57506000610e53565b6000846001600160a01b03166388a7ca5c611763611162565b8887876040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156117e85781810151838201526020016117d0565b50505050905090810190601f1680156118155780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561183757600080fd5b505af115801561184b573d6000803e3d6000fd5b505050506040513d602081101561186157600080fd5b50516001600160e01b031916632229f29760e21b14915050949350505050565b6001600160a01b0382166118c65760405162461bcd60e51b815260040180806020018281038252602181526020018061250b6021913960400191505060405180910390fd5b6118d2826000836113ea565b611915816040518060600160405280602281526020016122f8602291396001600160a01b038516600090815260336020526040902054919063ffffffff61160616565b6001600160a01b038316600090815260336020526040902055603554611941908263ffffffff61215716565b6035556040805182815290516000916001600160a01b038516916000805160206124eb8339815191529181900360200190a35050565b5490565b6001600160a01b0382166119d6576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6119e2600083836113ea565b6035546119f5908263ffffffff6116d016565b6035556001600160a01b038216600090815260336020526040902054611a21908263ffffffff6116d016565b6001600160a01b03831660008181526033602090815260408083209490945583518581529351929391926000805160206124eb8339815191529281900390910190a35050565b6000611a7b846001600160a01b031661113d565b611a87575060006109e1565b6000846001600160a01b0316637b04a2d0611aa0611162565b86866040518463ffffffff1660e01b815260040180846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611b0c578181015183820152602001611af4565b50505050905090810190601f168015611b395780820380516001836020036101000a031916815260200191505b50945050505050602060405180830381600087803b158015611b5a57600080fd5b505af1158015611b6e573d6000803e3d6000fd5b505050506040513d6020811015611b8457600080fd5b50516001600160e01b0319166307b04a2d60e41b149150509392505050565b6000611bad61169d565b82604051602001808061190160f01b81525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b60006fa2a8918ca85bafe22016d0b997e4df60600160ff1b03821115611c465760405162461bcd60e51b81526004018080602001828103825260228152602001806123876022913960400191505060405180910390fd5b8360ff16601b1480611c5b57508360ff16601c145b611c965760405162461bcd60e51b815260040180806020018281038252602281526020018061244f6022913960400191505060405180910390fd5b604080516000808252602080830180855289905260ff88168385015260608301879052608083018690529251909260019260a080820193601f1981019281900390910190855afa158015611cee573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611d51576040805162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b604482015290519081900360640190fd5b95945050505050565b80546001019055565b600054610100900460ff1680611d7c5750611d7c611252565b80611d8a575060005460ff16155b611dc55760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff16158015611484576000805460ff1961ff0019909116610100171660011790558015611496576000805461ff001916905550565b600054610100900460ff1680611e1c5750611e1c611252565b80611e2a575060005460ff16155b611e655760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff16158015611e90576000805460ff1961ff0019909116610100171660011790555b825160208085019190912083519184019190912060659190915560665580156113ea576000805461ff0019169055505050565b600054610100900460ff1680611edc5750611edc611252565b80611eea575060005460ff16155b611f255760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff16158015611f50576000805460ff1961ff0019909116610100171660011790555b6040518060526123a98239604051908190036052019020609a55508015610c99576000805461ff00191690555050565b600054610100900460ff1680611f995750611f99611252565b80611fa7575060005460ff16155b611fe25760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff1615801561200d576000805460ff1961ff0019909116610100171660011790555b825161202090603690602086019061223c565b50815161203490603790602085019061223c565b506038805460ff1916601217905580156113ea576000805461ff0019169055505050565b600054610100900460ff16806120715750612071611252565b8061207f575060005460ff16155b6120ba5760405162461bcd60e51b815260040180806020018281038252602e815260200180612421602e913960400191505060405180910390fd5b600054610100900460ff161580156120e5576000805460ff1961ff0019909116610100171660011790555b6114846301ffc9a760e01b6121b4565b60655490565b60665490565b600083838361210e612238565b6040805160208082019690965280820194909452606084019290925260808301523060a0808401919091528151808403909101815260c090920190528051910120949350505050565b6000828211156121ae576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6001600160e01b03198082161415612213576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b031916600090815260cc60205260409020805460ff19166001179055565b4690565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061227d57805160ff19168380011785556122aa565b828001600101855582156122aa579182015b828111156122aa57825182559160200191906001019061228f565b506122b69291506122ba565b5090565b6109a591905b808211156122b657600081556001016122c056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f2061646472657373455243313336333a205f636865636b416e6443616c6c417070726f7665207265766572747345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545434453413a20696e76616c6964207369676e6174757265202773272076616c75655065726d69742861646472657373206f776e65722c61646472657373207370656e6465722c75696e743235362076616c75652c75696e74323536206e6f6e63652c75696e7432353620646561646c696e6529455243313336333a205f636865636b416e6443616c6c5472616e736665722072657665727473496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445434453413a20696e76616c6964207369676e6174757265202776272076616c7565454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e74726163742945524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef45524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212203d9eb9eed8f3dcd5c5664b8999ad17adfdf6a60973f88befac69afd2bd49119064736f6c634300060b00335065726d69742861646472657373206f776e65722c61646472657373207370656e6465722c75696e743235362076616c75652c75696e74323536206e6f6e63652c75696e7432353620646561646c696e6529496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564'
