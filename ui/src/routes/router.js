import { createBrowserRouter } from "react-router-dom";

import Welcome from "../dashboard/Welcome";
import Login from "../pages/Login"

export const routers = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
    children:[
      {
        path:"auth",
        Component:Login
      }
    ]
  }
]);