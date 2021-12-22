import dayjs, { Dayjs } from "dayjs";
import { WalletProvider } from "peleswap-sdk";
import { Network } from "peleswap-sdk/lib/constants";
import { ConnectedWallet, WalletAccountInfo, WalletConnectType } from "./ConnectedWallet";

export interface ZeevesConnectProps {
  zeeves: WalletProvider;
  network: Network;
  timestamp?: Dayjs;
  bech32: string;
  byte20: string;
};
export class ZeevesConnectedWallet implements ConnectedWallet {
  type = WalletConnectType.Zeeves;

  provider: WalletProvider;
  network: Network;

  timestamp: Dayjs;
  addressInfo: WalletAccountInfo;

  constructor(props: ZeevesConnectProps) {
    this.provider = props.zeeves;
    this.network = props.network;
    this.timestamp = props.timestamp || dayjs();
    this.addressInfo = {
      bech32: props.bech32,
      byte20: props.byte20,
    };
  }
}