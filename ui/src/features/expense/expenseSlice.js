import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],

  selectedExpense: null,

  categoryWiseExpense: [],

  monthlySummary: {},

  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },

    setSelectedExpense: (state, action) => {
      state.selectedExpense = action.payload;
    },

    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
    },
  },
});

export const {
  setExpenses,
  setSelectedExpense,
  clearSelectedExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;