import { createSlice } from "@reduxjs/toolkit";

interface DeviceInfo {
  device: {
    model: null;
    os: null;
    vendor: null;
  };
}
const initialState: DeviceInfo = {
  device: {
    model: null,
    os: null,
    vendor: null,
  },
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
