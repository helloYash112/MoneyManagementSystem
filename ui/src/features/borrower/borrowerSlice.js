import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchBorrowers = createAsyncThunk(
  "borrower/fetchBorrowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `v1/borrowers/user/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createBorrower = createAsyncThunk(
  "borrower/createBorrower",
  async (borrowerData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/borrowers",
        borrowerData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateBorrower = createAsyncThunk(
  "borrower/updateBorrower",
  async ({ id, borrowerData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/borrowers/${id}`,
        borrowerData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update borrower"
      );
    }
  }
);

export const deleteBorrower = createAsyncThunk(
  "borrower/deleteBorrower",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`v1/borrowers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
const initialState = {
  borrowers: [],
  selectedBorrower: null,
  loading: false,
  error: null,
};

const borrowerSlice = createSlice({
  name: "borrower",
  initialState,

  reducers: {
    setSelectedBorrower: (state, action) => {
      state.selectedBorrower = action.payload;
    },

    clearSelectedBorrower: (state) => {
      state.selectedBorrower = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchBorrowers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowers = action.payload;
      })

      .addCase(fetchBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createBorrower.fulfilled, (state, action) => {
        state.borrowers.unshift(action.payload);
      })

      // Update
      .addCase(updateBorrower.fulfilled, (state, action) => {
        state.borrowers = state.borrowers.map((borrower) =>
          borrower.id === action.payload.id
            ? action.payload
            : borrower
        );
      })

      // Delete
      .addCase(deleteBorrower.fulfilled, (state, action) => {
        state.borrowers = state.borrowers.filter(
          (borrower) => borrower.id !== action.payload
        );
      });
  },
});

export const {
  setSelectedBorrower,
  clearSelectedBorrower,
} = borrowerSlice.actions;

export default borrowerSlice.reducer;