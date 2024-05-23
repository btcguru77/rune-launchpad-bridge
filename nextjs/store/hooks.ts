import { useSelector } from "react-redux";
import { AddressPurpose, BitcoinNetworkType } from "sats-connect";

interface IOpenApiReducer {
  deviceId: string
}

interface IAddress {
  address: string,
  pubkey: string,
  purpose: AddressPurpose
}
interface IBtcWalletReducer {
  network: BitcoinNetworkType,
  addresses: IAddress[],
  pubkey: string | string[],
  price: number,
  feeOptions: any
}

// interface IPersistedReducer {
//   btcWalletReducer: IBtcWalletReducer;
//   openAPIReducer: IOpenApiReducer
// }

export interface IState {
  btcWalletReducer: IBtcWalletReducer;
  openAPIReducer: IOpenApiReducer
}

export const useBtcWalletData = () => {
  return useSelector((state: IState) => state?.btcWalletReducer);
};


export const useBtcAddress = () => {
  const wallet = useSelector(
    (state: IState) => state?.btcWalletReducer
  );
  const taproot = wallet.addresses?.find((a) => a.purpose === AddressPurpose.Ordinals)?.address || ''
  const nestedsegwit = wallet.addresses?.find((a) => a.purpose === AddressPurpose.Payment)?.address || ''

  try {
    return { taproot, nestedsegwit };
  } catch (error) {
    return { taproot: "", nestedsegwit: "" };
  }
};


export const useOpenApi = () => {
  return useSelector((state: IState) => state?.btcWalletReducer);
};