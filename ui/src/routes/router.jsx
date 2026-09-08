import { createBrowserRouter } from "react-router-dom";

import Welcome from "../dashboard/Welcome";
import Login from "../pages/Login"
import Sidebar from "../components/ui/Sidebar"
import Navbar from "../components/ui/Navbar"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import Expenses from "../pages/Expenses"
import Categories from "../pages/Categories"
import Borrower from "../pages/Borrower"
import Loan from "../pages/Loan"



export const routers = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<MainLayout></MainLayout>}></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <ProtectedRoute children={<Dashboard></Dashboard>}></ProtectedRoute>,

      }, {
        path: "profile",
        element: <Profile></Profile>
      }, {
        path: "expenses",
        element: <Expenses></Expenses>
      },
      {
        path: "categories",
        element: <Categories></Categories>
      },
      {
        path: "/borrowers",
        element: <Borrower></Borrower>,
      },
      {
        path: "/loans/:borrowerId",
        element: <Loan></Loan>,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  }
]);