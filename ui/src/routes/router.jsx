import { createBrowserRouter } from "react-router-dom";

import Welcome from "../dashboard/Welcome";
import Login from "../pages/Login"
import Sidebar from "../components/ui/Sidebar"
import Navbar from "../components/ui/Navbar"
import MainLayout from "../layouts/MainLayout"
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";




export const routers = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<MainLayout></MainLayout>}></ProtectedRoute>,
    children: [
      {
        index: true, 
        element:<ProtectedRoute children={<Dashboard></Dashboard>}></ProtectedRoute> ,
        
      },{
        path:"profile",
        element:<Profile></Profile>
      }
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  }
]);