import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice.js';
import authReducer from '../store/slice/authSlice.js';
import cartReducer from '../store/slice/cartSlice.js'
const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
  }
});

export default store;
