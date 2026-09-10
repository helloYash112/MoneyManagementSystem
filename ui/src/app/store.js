import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/auth/userSlice'   
import borrowerReducer from "../features/borrower/borrowerSlice";
import loanReducer from "../features/loan/loanSlice";
import repaymentReducer from "../features/repayment/repaymentSlice";
import expenseReducer from "../features/expense/expenseSlice";
import uiReducer from "../features/ui/uiSlice";
import categoriesReducer from "../features/categories/categoriesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,       
    borrower: borrowerReducer,
    loan: loanReducer,
    repayment: repaymentReducer,
    expense: expenseReducer,
    ui: uiReducer,
    categories:categoriesReducer
  },
})

