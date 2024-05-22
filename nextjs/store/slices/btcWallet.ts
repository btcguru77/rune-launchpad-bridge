import { createSlice } from "@reduxjs/toolkit";
import { BitcoinNetworkType } from "sats-connect";

const initialState = {
  network: BitcoinNetworkType.Testnet,
  address: "",
  pubkey: "",
  price: 60000,
  feeOptions: [
    {
      title: "Slow",
      desc: "About 1 hours",
      feeRate: 12,
    },
    {
      title: "Avg",
      desc: "About 30 minutes",
      feeRate: 12,
    },
    {
      title: "Fast",
      desc: "About 10 minutes",
      feeRate: 13,
    },
    { title: "Custom", feeRate: 0 },
  ],
};

export const btcWallet = createSlice({
  name: "btcWallet",
  initialState: initialState,
  reducers: {
    updateBtcNetwork: (state, action) => {
      state.network = action.payload
    },
    updateBtcPrice: (state, action) => {
      state.price = action.payload;
    },
    updateBtcFeeRate: (state, action) => {
      state.feeOptions = [
        ...action.payload.feeRate,
        { title: "Custom", feeRate: 0 },
      ];
    },
    updateBtcAddress: (state, action) => {
      state.address = action.payload;
    },
    updateBtcPubkey: (state, action) => {
      state.pubkey = action.payload;
    },
  },
});

export const {
  updateBtcNetwork,
  updateBtcPrice,
  updateBtcFeeRate,
  updateBtcAddress,
  updateBtcPubkey
} = btcWallet.actions;
export default btcWallet.reducer;
