import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the cart
const initialState = {
    cart: null,
    loading: false,
    error: null,
    productNames: [],
};

// Thunks (async actions)

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/cart/getCart', {
                withCredentials: true // This should be part of the configuration object
            });
            return response.data; // { cart, productNames }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addCart = createAsyncThunk(
    'cart/addCart',
    async ({ productId, quantity, size }) => {
        try {
            console.log(productId, quantity, size)
            const response = await axios.post('http://localhost:3000/cart/addCart', { productId, quantity, size },{
                withCredentials: true
            });
            // console.log(response)
            return response.data.cart; // Updated cart

        } catch (error) {
            return error.response.data;
        }
    }
);

export const editCart = createAsyncThunk(
    'cart/editCart',
    async ({ productId, updatedQuantity }, { rejectWithValue }) => {
        try {
            const response = await axios.patch('http://localhost:3000/cart/editCart', { productId, updatedQuantity });
            return response.data.cart; // Updated cart
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteItemFromCart = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (productId) => {
        try {
            // console.log("deleting : ", productId)
            const response = await axios.delete('http://localhost:3000/cart/delete', {
                data: { productId },  // Send the productId in the request body
                withCredentials: true,
              });
            return response.data.cart; // Updated cart after deletion
        } catch (error) {
            return error.response.data;
        }
    }
);

export const logoutCart = createAsyncThunk(
    'cart/logoutCart',
    async (_, { rejectWithValue }) => {
        try {
            // Optionally, you can clear the cart on the backend if needed
            return null; // Simply returning null will clear the cart in the store
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to clear cart');
        }
    }
);

// Create the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle the `getCart` action
        builder.addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            // console.log("get",action.payload.cart)
            state.loading = false;
            state.cart = action.payload.cart;
            state.productNames = action.payload.productNames;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch cart';
        });

        // Handle the `addCart` action
        builder.addCase(addCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });
        builder.addCase(addCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to add product to cart';
        });

        // Handle the `editCart` action
        builder.addCase(editCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(editCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });
        builder.addCase(editCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to edit product quantity';
        });

        // Handle the `deleteItemFromCart` action
        builder.addCase(deleteItemFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            // console.log("delete:", action.payload)
            state.loading = false;
            state.cart = [action.payload];
        });
        builder.addCase(deleteItemFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to delete product from cart';
        });
        builder.addCase(logoutCart.fulfilled, (state) => {
            state.cart = null;  // Clear the cart state on logout
            state.productNames = [];
        })
        // Add the logoutCart case for rejection, if needed
        builder.addCase(logoutCart.rejected, (state, action) => {
            state.error = action.payload || 'Failed to clear cart';
        });
    }
});

// Export the selector to access the cart data in your components
export const selectCart = (state) => state.cart.cart;
export const selectLoading = (state) => state.cart.loading;
export const selectError = (state) => state.cart.error;

// Export the actions (currently we only use async actions)
export default cartSlice.reducer;
