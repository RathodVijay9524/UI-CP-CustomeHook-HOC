import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../service/authService';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials);
    localStorage.setItem('jwtToken', data.jwtToken);
    localStorage.setItem('refreshToken', data.refreshTokenDto.token);
    console.log('Login success data:', data);
    return data;
  } catch (error) {
    console.error('Error in login thunk:', error.message);
    return rejectWithValue({ message: error.message });
  }
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const data = await authService.fetchUserData();
    console.log('FetchUserData success data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchUserData thunk:', error.message);
    return rejectWithValue({ message: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    logs: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.logs.push(`User ${action.payload.username} set successfully.`);
    },
    resetSuccessMessage: (state) => {
      state.successMessage = '';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      state.logs.push('User logged out.');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.logs.push('Login attempt started.');
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.jwtToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.logs.push(`Login successful for user ${action.payload.username}.`);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
        state.logs.push(`Login failed: ${action.payload.message}`);
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.logs.push(`Fetched user data for user ${action.payload.username}.`);
      });
  },
});

export const { setUser, logout, resetSuccessMessage } = authSlice.actions;

export default authSlice.reducer;
