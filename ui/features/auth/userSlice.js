import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';
// Async thunk to fetch user data by ID
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch user');
    }
  }
);

// Async thunk to create a new user
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users', userData);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to create user');
    }
  }
);

const initialState = {
  userName: null,
  profileImg: null,
  email: null,
  userId: null,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
    updateProfileImg: (state, action) => {
      state.profileImg = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, userName, email, profileImg } = action.payload;
        state.userId = userId;
        state.userName = userName;
        state.email = email;
        state.profileImg = profileImg;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, userName, email, profileImg } = action.payload;
        state.userId = userId;
        state.userName = userName;
        state.email = email;
        state.profileImg = profileImg;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUser, updateProfileImg } = userSlice.actions;
export default userSlice.reducer;
