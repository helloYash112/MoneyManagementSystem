import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repayments: [],

  upcomingRepayments: [],

  overdueRepayments: [],

  selectedRepayment: null,

  loading: false,
  error: null,
};

const repaymentSlice = createSlice({
  name: "repayment",
  initialState,
  reducers: {
    setRepayments: (state, action) => {
      state.repayments = action.payload;
    },

    setSelectedRepayment: (state, action) => {
      state.selectedRepayment = action.payload;
    },

    clearSelectedRepayment: (state) => {
      state.selectedRepayment = null;
    },
  },
});

export const {
  setRepayments,
  setSelectedRepayment,
  clearSelectedRepayment,
} = repaymentSlice.actions;

export default repaymentSlice.reducer;