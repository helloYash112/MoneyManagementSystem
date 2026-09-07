// src/store/slices/loanSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

/*
|--------------------------------------------------------------------------
| GET ALL LOANS BY BORROWER
|--------------------------------------------------------------------------
*/

export const fetchLoansByBorrower = createAsyncThunk(
  "loan/fetchLoansByBorrower",
  async (borrowerId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/loans/borrower/${borrowerId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch loans"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET SINGLE LOAN
|--------------------------------------------------------------------------
*/

export const fetchLoanById = createAsyncThunk(
  "loan/fetchLoanById",
  async (loanId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/loans/${loanId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch loan"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CREATE LOAN
|--------------------------------------------------------------------------
*/

export const createLoan = createAsyncThunk(
  "loan/createLoan",
  async (loanData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/loans",
        loanData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create loan"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UPDATE LOAN
|--------------------------------------------------------------------------
*/

export const updateLoan = createAsyncThunk(
  "loan/updateLoan",
  async ({ id, loanData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/loans/${id}`,
        loanData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update loan"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| REGISTER REPAYMENT
|--------------------------------------------------------------------------
*/

export const registerRepayment = createAsyncThunk(
  "loan/registerRepayment",
  async ({ id, repaymentAmount }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/loans/${id}/repay`,
        null,
        {
          params: {
            repaymentAmount,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to register repayment"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| DELETE LOAN
|--------------------------------------------------------------------------
*/

export const deleteLoan = createAsyncThunk(
  "loan/deleteLoan",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/loans/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete loan"
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  loans: [],
  selectedLoan: null,

  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const loanSlice = createSlice({
  name: "loan",

  initialState,

  reducers: {
    setSelectedLoan: (state, action) => {
      state.selectedLoan = action.payload;
    },

    clearSelectedLoan: (state) => {
      state.selectedLoan = null;
    },

    clearLoanError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH LOANS
      |--------------------------------------------------------------------------
      */

      .addCase(fetchLoansByBorrower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchLoansByBorrower.fulfilled,
        (state, action) => {
          state.loading = false;
          state.loans = action.payload;
        }
      )

      .addCase(
        fetchLoansByBorrower.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /*
      |--------------------------------------------------------------------------
      | FETCH LOAN BY ID
      |--------------------------------------------------------------------------
      */

      .addCase(fetchLoanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLoanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLoan = action.payload;
      })

      .addCase(fetchLoanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | CREATE LOAN
      |--------------------------------------------------------------------------
      */

      .addCase(createLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.unshift(action.payload);
      })

      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE LOAN
      |--------------------------------------------------------------------------
      */

      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateLoan.fulfilled, (state, action) => {
        state.loading = false;

        state.loans = state.loans.map((loan) =>
          loan.id === action.payload.id
            ? action.payload
            : loan
        );

        if (
          state.selectedLoan?.id === action.payload.id
        ) {
          state.selectedLoan = action.payload;
        }
      })

      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | REGISTER REPAYMENT
      |--------------------------------------------------------------------------
      */

      .addCase(registerRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        registerRepayment.fulfilled,
        (state, action) => {
          state.loading = false;

          state.loans = state.loans.map((loan) =>
            loan.id === action.payload.id
              ? action.payload
              : loan
          );

          if (
            state.selectedLoan?.id === action.payload.id
          ) {
            state.selectedLoan = action.payload;
          }
        }
      )

      .addCase(
        registerRepayment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /*
      |--------------------------------------------------------------------------
      | DELETE LOAN
      |--------------------------------------------------------------------------
      */

      .addCase(deleteLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loading = false;

        state.loans = state.loans.filter(
          (loan) => loan.id !== action.payload
        );
      })

      .addCase(deleteLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedLoan,
  clearSelectedLoan,
  clearLoanError,
} = loanSlice.actions;

export default loanSlice.reducer;