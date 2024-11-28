import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  const response = await axios.post(
    'http://localhost:3000/auth/login',
    { username: email, password },
    { withCredentials: true }
  );
  return response.data; 
});


export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response = await axios.post(
    'http://localhost:3000/auth/logout', 
    {},
    { withCredentials: true }
  );
  return response.data; 
});


export const updateUser = createAsyncThunk('auth/updateUser', async ({ name, address }) => {
  const response = await axios.patch(
    'http://localhost:3000/auth/profile',
    { name, address },
    { withCredentials: true }
  );
  return response.data; 
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    error: null,
    userData: JSON.parse(localStorage.getItem('userData')) || null, 
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null; 
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload.user;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData'); 
      })
      .addCase(updateUser.fulfilled, (state, action) => {
       
        state.userData = action.payload.user;
        localStorage.setItem('userData', JSON.stringify(action.payload.user)); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message; 
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message; 
      });
  },
});
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const { logout } = authSlice.actions;
export default authSlice.reducer;






// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
//   const response = await axios.post(
//     'http://localhost:3000/auth/login',
//     { username: email, password },
//     { withCredentials: true }
//   );
//   return response.data; 
// });

// export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
//   const response = await axios.post(  
//     'http://localhost:3000/auth/logout', 
//     {},
//     { withCredentials: true }
//   );
//   return response.data; 
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
//     error: null,
//     userData: JSON.parse(localStorage.getItem('userData')) || null, 
//   },
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.userData = null; 
//       localStorage.removeItem('isAuthenticated');
//       localStorage.removeItem('userData'); 
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         console.log(action.payload);
        
//         state.userData = action.payload.user;
//         localStorage.setItem('isAuthenticated', 'true');
//         localStorage.setItem('userData', JSON.stringify(action.payload.user));
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.isAuthenticated = false;
//         state.userData = null;
//         localStorage.removeItem('isAuthenticated');
//         localStorage.removeItem('userData'); 
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.error.message; 
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

