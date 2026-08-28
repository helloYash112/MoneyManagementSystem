import { createBrowserRouter } from "react-router-dom";
import Welcome from './dashboard/Welcome.jsx'
export const routers=createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
    
  },
]);
