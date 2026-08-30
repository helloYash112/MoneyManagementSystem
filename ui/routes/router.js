import { createBrowserRouter } from "react-router-dom";
import Welcome from '../src/dashboard/Welcome.jsx'
export const routers=createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
    
  },
]);
