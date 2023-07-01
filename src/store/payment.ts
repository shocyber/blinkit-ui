import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: false,
};

const Payment = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showPayment: (state) => {
      state.payment = true;
    },
    hidePayment: (state) => {
      state.payment = false;
    },
  },
});

export default Payment.reducer;
export const { showPayment, hidePayment } = Payment.actions;
