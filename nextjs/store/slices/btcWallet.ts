import { createSlice } from "@reduxjs/toolkit";
import { AddressPurpose, BitcoinNetworkType } from "sats-connect";

export const initialState = {
  network: BitcoinNetworkType.Testnet,
  addresses: [
    {
      address: "",
      pubkey: "",
      purpose: AddressPurpose.Payment
    },
    {
      address: "",
      pubkey: "",
      purpose: AddressPurpose.Ordinals
    },
  ],
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
    updateBtcAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    // updateBtcPubkey: (state, action) => {
    //   state.pubkey = action.payload;
    // },
    disconnectBtcWallet: (state) => {
      state.addresses = initialState.addresses
    }
  },
});

export const {
  updateBtcNetwork,
  updateBtcPrice,
  updateBtcFeeRate,
  updateBtcAddresses,
  disconnectBtcWallet,
  // updateBtcPubkey
} = btcWallet.actions;
export default btcWallet.reducer;
