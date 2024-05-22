import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import WalletContext from "@/context/wallet";
import { WalletStandardProvider } from "@wallet-standard/react";

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders

    storeRef.current = makeStore();
  }
  return (
    <>
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={storeRef.current.__persistor}>
          <WalletStandardProvider>
            <WalletContext>
              <Component {...pageProps} />
            </WalletContext>
          </WalletStandardProvider>
        </PersistGate>
      </Provider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
