import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async ({ pageNumber = 0, pageSize = 2, sortBy = 'name', sortDir = 'asc' }, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await axios.get(`http://localhost:9091/api/v1/workers/pageable?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for soft deleting a user
export const softDeleteUser = createAsyncThunk(
  'users/softDeleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`http://localhost:9091/api/v1/workers/soft/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return { id, successMessage: response.data.message }; // Return the id and success message
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { errorMessage: 'Failed to soft delete user' });
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    loading: false,
    error: null,
    successMessage: null, // Store success message after deletion
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.content; // The list of users
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.pageNumber = action.payload.pageNumber;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { errorMessage: 'Failed to fetch users' };
      })
      .addCase(softDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(softDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.successMessage; // Store success message

        // Remove the soft-deleted user from the list by filtering out the deleted user's id
        state.users = state.users.filter(user => user.id !== action.payload.id);
      })
      .addCase(softDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { errorMessage: 'Failed to soft delete user' };
      });
  },
});

export default userSlice.reducer;