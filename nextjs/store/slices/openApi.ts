import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceId: "",
};

export const openAPI = createSlice({
  name: "openAPI",
  initialState: initialState,
  reducers: {
    deviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
});

export const { deviceId } = openAPI.actions;
export default openAPI.reducer;
