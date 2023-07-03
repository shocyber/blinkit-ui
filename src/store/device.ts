import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  device: {},
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export default deviceSlice.reducer;
export const { setDevice } = deviceSlice.actions;
