import { BN, Long, bytes } from '@zilliqa-js/util';
import { fromBech32Address } from "@zilliqa-js/crypto";
import BigNumber from "bignumber.js";
import groupBy from "lodash/groupBy";
import { Network } from "peleswap-sdk/lib/constants";
import { ObservedTx } from "peleswap-sdk";
import { ConnectedWallet } from "core/wallet";
import { ZilswapConnector } from 'core/zilswap';
import { logger } from 'core/utilities';
import { CHAIN_IDS, MSG_VERSION, REWARDS_DISTRIBUTOR_CONTRACT } from "../zilswap/constants";

export interface Distribution {
  distrAddr: string;
  epochNumber: number;
  amount: BigNumber;
  proof: string[];
}

export interface ClaimEpochOpts {
  network: Network
  wallet: ConnectedWallet
  epochNumber: number;
  amount: BigNumber;
  proof: string[];
};

export interface ClaimMultiOpts {
  network: Network;
  wallet: ConnectedWallet;
  distributions: Distribution[];
}

const getTxArgs = (epoch: number, proof: string[], address: string, amount: BigNumber, contractAddr: string) => {
  const contractAddrByStr20 = fromBech32Address(contractAddr).toLowerCase();
  return [{
    vname: "claim",
    type: `${contractAddrByStr20}.Claim`,
    value: {
      constructor: `${contractAddrByStr20}.Claim`,
      argtypes: [],
      arguments: [
        epoch.toString(),
        {
          constructor: `${contractAddrByStr20}.DistributionLeaf`,
          argtypes: [],
          arguments: [address, amount.toString(10)],
        },
        proof.map(item => `0x${item}`),
      ],
    },
  }];
};

export const claim = async (claimOpts: ClaimEpochOpts): Promise<ObservedTx> => {
  const { network, wallet, epochNumber, proof, amount } = claimOpts;
  const zilswap = ZilswapConnector.getSDK()

  if (!zilswap.zilliqa) throw new Error("Wallet not connected");

  const contractAddr = REWARDS_DISTRIBUTOR_CONTRACT[network]
  const chainId = CHAIN_IDS[network];
  const distContract = zilswap.getContract(contractAddr);

  const address = wallet.addressInfo.byte20;

  const args: any = getTxArgs(epochNumber, proof, address, amount, contractAddr);

  const minGasPrice = (await zilswap.zilliqa.blockchain.getMinimumGasPrice()).result as string;
  const params: any = {
    amount: new BN(0),
    gasPrice: new BN(minGasPrice),
    gasLimit: "5000",
    version: bytes.pack(chainId, MSG_VERSION),
  };

  const claimTx = await zilswap.callContract(distContract, "Claim", args, params, true);
  logger("claim tx dispatched", claimTx.id);

  if (claimTx.isRejected()) {
    throw new Error('Submitted transaction was rejected.')
  }

  const observeTxn: ObservedTx = {
    hash: claimTx.id!,
    deadline: Number.MAX_SAFE_INTEGER,
  };

  await zilswap.observeTx(observeTxn)

  return observeTxn
};

const getMultiTxArgs = (distributions: Distribution[], userAddr: string, contractAddr: string) => {
  const groupedDistrs = groupBy(distributions, "distrAddr")
  return [
    {
      vname: "account",
      type: "ByStr20",
      value: userAddr,
    },
    {
    vname: "claims",
    type: `List(Pair ByStr20 (List (Pair (Pair Uint32 Uint128) (List ByStr32))))`,
    value: Object.entries(groupedDistrs).map(([distrAddr, distrs]) => (
      {
        constructor: "Pair",
        argtypes: ["ByStr20", "List (Pair (Pair Uint32 Uint128) (List ByStr32))"],
        arguments: [
          distrAddr,
          distrs.map(distribution => (
            {
              constructor: "Pair",
              argtypes: ["Pair Uint32 Uint128", "List ByStr32"],
              arguments: [
                {
                  constructor: "Pair",
                  argtypes: ["Uint32", "Uint128"],
                  arguments: [
                    distribution.epochNumber.toString(),
                    distribution.amount.toString(10),
                  ],
                },
                distribution.proof.map(item => `0x${item}`),
              ]
            }
          ))
        ]
      }
    ))
  }]
};

export const claimMulti = async (claimOpts: ClaimMultiOpts): Promise<ObservedTx> => {
  const { network, wallet, distributions } = claimOpts;
  const zilswap = ZilswapConnector.getSDK()

  if (!zilswap.zilliqa) throw new Error("Wallet not connected");

  const contractAddr = REWARDS_DISTRIBUTOR_CONTRACT[network]
  const chainId = CHAIN_IDS[network];
  const distContract = zilswap.getContract(contractAddr);

  const userAddr = wallet.addressInfo.byte20;

  const contractAddrByStr20 = fromBech32Address(contractAddr).toLowerCase();
  const args: any = getMultiTxArgs(distributions, userAddr, contractAddrByStr20);

  const minGasPrice = (await zilswap.zilliqa.blockchain.getMinimumGasPrice()).result as string;
  const params: any = {
    amount: new BN(0),
    gasPrice: new BN(minGasPrice),
    gasLimit: Long.fromNumber(15000),
    version: bytes.pack(chainId, MSG_VERSION),
  };

  const claimTx = await zilswap.callContract(distContract, "ClaimMulti", args, params, true);
  logger("claim tx dispatched", claimTx.id);

  if (claimTx.isRejected()) {
    throw new Error('Submitted transaction was rejected.')
  }

  const observeTxn: ObservedTx = {
    hash: claimTx.id!,
    deadline: Number.MAX_SAFE_INTEGER,
  };

  await zilswap.observeTx(observeTxn)

  return observeTxn
};
