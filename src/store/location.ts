import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    city: null,
    state: null,
    state_code: null,
    postcode: null,
    country: null,
  },
  latitude: null,
  longitude: null,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    currentLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const { currentLocation, setError, setAddress } = locationSlice.actions;
