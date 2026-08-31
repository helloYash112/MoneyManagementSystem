import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loans: [],

  selectedLoan: null,

  summary: {
    active: 0,
    completed: 0,
    overdue: 0,
  },

  loading: false,
  error: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },

    setSelectedLoan: (state, action) => {
      state.selectedLoan = action.payload;
    },

    clearSelectedLoan: (state) => {
      state.selectedLoan = null;
    },
  },
});

export const {
  setLoans,
  setSelectedLoan,
  clearSelectedLoan,
} = loanSlice.actions;

export default loanSlice.reducer;