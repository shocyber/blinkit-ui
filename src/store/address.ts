import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressPanel: false,
};

const addressBar = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAddressBar: (state) => {
      state.addressPanel = true;
    },
    hideAddressBar: (state) => {
      state.addressPanel = false;
    },
  },
});

export default addressBar.reducer;
export const { showAddressBar, hideAddressBar } = addressBar.actions;
