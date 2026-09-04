import { createBrowserRouter } from "react-router-dom";

import Welcome from "../dashboard/Welcome";
import Login from "../pages/Login"
import Sidebar from "../components/ui/Sidebar"
import Navbar from "../components/ui/Navbar"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard";



export const routers = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [

      {

        index: true,

        Component: Dashboard,

      },

    ],
  },
  {
    path: "/auth",
    Component: Login,
  },

]);