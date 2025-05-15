import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  urlCategories: 'http://localhost:3333/categories/',
  urlProducts: 'http://localhost:3333/products/',
 

  categories: {
    data: [],
    status: 'idle',
    error: null,
  },
  products: {
    data: [],
    status: 'idle',
    error: null,
  },
};
const fetchFunction = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
export const fetchCategories = createAsyncThunk(
  'global/fetchCategories',
  fetchFunction(initialState.urlCategories + 'all')
);

export const fetchProducts = createAsyncThunk(
  'global/fetchProducts',
  fetchFunction(initialState.urlProducts + 'all')
);

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.status = 'loading';
        state.categories.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.status = 'succeeded';
        state.categories.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories.status = 'failed';
        state.categories.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.products.status = 'loading';
        state.products.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.status = 'succeeded';
        state.products.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products.status = 'failed';
        state.products.error = action.error.message;
      });
  },
});

export default globalSlice.reducer;
