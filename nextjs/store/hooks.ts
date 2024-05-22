import { useSelector } from "react-redux";
import { BitcoinNetworkType } from "sats-connect";

interface IOpenApiReducer {
  deviceId: string
}
interface IBtcWalletReducer {
  network: BitcoinNetworkType,
  address: string | string[],
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
  try {
    return { btcAddress: wallet.address };
  } catch (error) {
    return { btcAddress: "" };
  }
};


export const useOpenApi = () => {
  return useSelector((state: IState) => state?.btcWalletReducer);
};