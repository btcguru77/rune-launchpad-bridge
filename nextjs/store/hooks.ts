import { useSelector } from "react-redux";

interface IBtcWalletReducer {
  value: any;
}

interface IPersistedReducer {
  btcWalletReducer: IBtcWalletReducer;
}

export interface IState {
  persistedReducer: IPersistedReducer
}

export const useWalletData = () => {
  return useSelector((state: IState) => state?.persistedReducer?.btcWalletReducer?.value);
};

export const useAddress = () => {
  const wallet = useSelector(
    (state: IState) => state?.persistedReducer?.btcWalletReducer?.value
  );
  try {
    return { address: wallet?.account?.accounts[0]?.address };
  } catch (error) {
    return { address: "" };
  }
};
