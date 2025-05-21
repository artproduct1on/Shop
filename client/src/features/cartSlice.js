import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      };

    },

    removeFromCart: (state, { payload }) => {   // payload - id
      state.cart = state.cart.filter((item) => item.id !== payload);
    },

    changeQuantity: (state, { payload }) => {  // payload - {id, num: +1 or -1}
      const existingItem = state.cart.find((item) => item.id === payload.id);
      if (existingItem) {

        if (payload.num < 0 && existingItem.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== payload.id);
        } else {
          existingItem.quantity += payload.num;
        }

      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },

});

export default cartSlice.reducer;
