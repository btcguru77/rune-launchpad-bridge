import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
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
  },
};

export const btcWallet = createSlice({
  name: "btcWallet",
  initialState: initialState,
  reducers: {
    updateBtcPrice: (state, action) => {
      state.value.price = action.payload;
    },
    updateBtcFeeRate: (state, action) => {
      state.value.feeOptions = [
        ...action.payload.feeRate,
        { title: "Custom", feeRate: 0 },
      ];
    },
    updateBtcAddress: (state, action) => {
      state.value.address = action.payload;
    },
    updateBtcPubkey: (state, action) => {
      state.value.pubkey = action.payload;
    },
  },
});

export const {
  updateBtcPrice,
  updateBtcFeeRate,
  updateBtcAddress,
  updateBtcPubkey
} = btcWallet.actions;
export default btcWallet.reducer;
