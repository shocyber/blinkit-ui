import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart'
import modalReducer from './modal'
import uiReducer from './ui'
import locationReducer from "./location";
import addressReducer from "./address";
import paymentReducer from "./payment";
import deviceReducer from "./device";
import loaderReducer from "./loader";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    location: locationReducer,
    address: addressReducer,
    payment: paymentReducer,
    loader: loaderReducer,
    device: deviceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;