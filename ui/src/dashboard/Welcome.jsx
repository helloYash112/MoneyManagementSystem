import { Outlet } from "react-router-dom"

export default function Welcome() {
  return (
    <>
      <h1>Welcome to money management system app</h1>
      <Outlet />
    </>
  );
}