import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromStorage, setToStorage } from "../../utils/localStorage";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";

const initialState = {
  cartList: [],
  status: "idle",
  error: null,
};

export const initializeCartFromLocalStorage = createAsyncThunk(
  "cart/initializeCartFromLocalStorage",
  async () => {
    const savedState = getFromStorage(LOCAL_STORAGE_KEYS.CART);
    return savedState ? savedState : [];
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const item = state.cartList.find((item) => item.id === payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.cartList.push({ ...payload, quantity: 1 });
      };
      setToStorage(LOCAL_STORAGE_KEYS.CART, state.cartList);
    },

    removeFromCart: (state, { payload }) => {
      // payload - id
      state.cartList = state.cartList.filter((item) => item.id !== payload);
      setToStorage(LOCAL_STORAGE_KEYS.CART, state.cartList);
    },

    changeQuantity: (state, { payload }) => {
      // payload - {id, num: +1 or -1}
      const existingItem = state.cartList.find((item) => item.id === payload.id);
      if (existingItem) {

        if (payload.num < 0 && existingItem.quantity === 1) {
          state.cartList = state.cartList.filter((item) => item.id !== payload.id);
        } else {
          existingItem.quantity += payload.num;
        }

        setToStorage(LOCAL_STORAGE_KEYS.CART, state.cartList);
      }
    },

    clearCart: (state) => {
      state.cartList = [];
      setToStorage(LOCAL_STORAGE_KEYS.CART, []);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initializeCartFromLocalStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Cart Slice succeeded", action.payload);
        state.cartList = action.payload;
      })
      .addCase(initializeCartFromLocalStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeCartFromLocalStorage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },

});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
