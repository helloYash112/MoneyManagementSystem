import { Outlet } from "react-router-dom"

export default function Welcome() {
  return (
    <>
      <h1 className=" w-2xs text-2xl bg-inherit">Welcome to money management system app</h1>
      <Outlet />
    </>
  );
}