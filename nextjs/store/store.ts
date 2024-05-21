import { combineReducers, configureStore } from "@reduxjs/toolkit";
import btcWalletReducer from "./slices/wallet";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

const persisConfig = {
  key: "runesAirdrop",
  storage,
};

const rootReducer = combineReducers({
  btcWalletReducer,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      persistedReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = makeStore();

setupListeners(store.dispatch);
