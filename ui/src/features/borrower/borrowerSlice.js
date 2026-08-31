import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrowers: [],
  selectedBorrower: null,

  filters: {
    search: "",
    status: "ALL",
  },

  loading: false,
  error: null,
};

const borrowerSlice = createSlice({
  name: "borrower",
  initialState,
  reducers: {
    setBorrowers: (state, action) => {
      state.borrowers = action.payload;
    },

    setSelectedBorrower: (state, action) => {
      state.selectedBorrower = action.payload;
    },

    clearSelectedBorrower: (state) => {
      state.selectedBorrower = null;
    },
  },
});

export const {
  setBorrowers,
  setSelectedBorrower,
  clearSelectedBorrower,
} = borrowerSlice.actions;

export default borrowerSlice.reducer;