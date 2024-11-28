import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  }
);

// Initial state for products
const initialState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null
};

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filteredProducts = state.products.filter(product => product.category === category);
    },
    resetFilter: (state) => {
      state.filteredProducts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload; // Show all products initially
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export actions
export const { filterByCategory, resetFilter } = productSlice.actions;

// Export the reducer to be used in the store
export default productSlice.reducer;

