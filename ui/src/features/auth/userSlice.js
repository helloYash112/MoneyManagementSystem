import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
// Async thunk to fetch user data by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch user");
    }
  },
);

// Async thunk to create a new user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create user");
    }
  },
);

// Async thunk to fetch currently authenticated OAuth user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/me");
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch current user",
      );
    }
  },
);
//update user profile data

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",

  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${id}/profile`, profileData);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

const initialState = {
  userName: null,
  profileImg: null,
  email: null,
  userId: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
    updateProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    loginSuccess: (state, action) => {
      const { userId, userName, email, profileImg } = action.payload;
      state.userId = userId;
      state.userName = userName;
      state.email = email;
      state.profileImg = profileImg;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
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
        const user = action.payload;

        state.userId = user.id;
        state.userName = user.name;
        state.email = user.email;
        state.profileImg = user.imageUrl;

        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
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
        state.isAuthenticated = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;

        const user = action.payload;

        state.userId = user.id;
        state.userName = user.name;
        state.email = user.email;
        state.profileImg = user.imageUrl;

        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.userId = null;
        state.userName = null;
        state.email = null;
        state.profileImg = null;

        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;

        const user = action.payload;

        state.userId = user.id;
        state.userName = user.name;
        state.email = user.email;
        state.profileImg = user.imageUrl;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      });
  },
});

export const { clearUser, updateProfileImg, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;
