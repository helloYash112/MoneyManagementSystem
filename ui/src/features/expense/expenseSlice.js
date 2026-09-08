import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

// Get all expenses for a user
export const fetchExpensesByUser = createAsyncThunk(
  "expense/fetchExpensesByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/expenses/user/${userId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch expenses",
      );
    }
  },
);

// Get single expense
export const fetchExpenseById = createAsyncThunk(
  "expense/fetchExpenseById",
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/expenses/${expenseId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch expense",
      );
    }
  },
);

// Create expense
export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/expenses",
        expenseData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create expense",
      );
    }
  },
);

// Update expense
export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/expenses/${id}`,
        expenseData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update expense",
      );
    }
  },
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, { rejectWithValue }) => {
    try {
      await api.delete(
        `/expenses/${expenseId}`,
      );

      return expenseId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete expense",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  expenses: [],
  selectedExpense: null,
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const expenseSlice = createSlice({
  name: "expense",

  initialState,

  reducers: {
    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
    },

    clearExpenseError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Expenses
      .addCase(fetchExpensesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpensesByUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.expenses = action.payload;
        },
      )
      .addCase(
        fetchExpensesByUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Fetch Expense By Id
      .addCase(fetchExpenseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpenseById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedExpense = action.payload;
        },
      )
      .addCase(
        fetchExpenseById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Create Expense
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createExpense.fulfilled,
        (state, action) => {
          state.loading = false;

          state.expenses.unshift(action.payload);
        },
      )
      .addCase(
        createExpense.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateExpense.fulfilled,
        (state, action) => {
          state.loading = false;

          state.expenses = state.expenses.map(
            (expense) =>
              expense.id === action.payload.id
                ? action.payload
                : expense,
          );

          state.selectedExpense = action.payload;
        },
      )
      .addCase(
        updateExpense.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteExpense.fulfilled,
        (state, action) => {
          state.loading = false;

          state.expenses = state.expenses.filter(
            (expense) => expense.id !== action.payload,
          );
        },
      )
      .addCase(
        deleteExpense.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {
  clearSelectedExpense,
  clearExpenseError,
} = expenseSlice.actions;

export default expenseSlice.reducer;