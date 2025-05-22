import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
  },
});
