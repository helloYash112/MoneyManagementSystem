import {
  LayoutDashboard,
  Wallet,
  Tags,
  User,
  LogOut,
} from "lucide-react";
import { logout } from "../../features/auth/userSlice"
import { useDispatch } from 'react-redux';

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Expenses",
      icon: <Wallet size={20} />,
      path: "/expenses",
    },
    {
      name: "Categories",
      icon: <Tags size={20} />,
      path: "/categories",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];
  const dispatch= useDispatch();
  const handleLogout = () => {
    
    if (window.confirm("Are you sure you want to logout?")) {
      
      dispatch(logout());
      
    }
    11
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Money Manager
        </h1>
      </div>

      <nav className="mt-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 hover:bg-slate-800 ${isActive ? "bg-slate-800" : ""
              }`
            }
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-5 w-full px-5">
        <button className="flex items-center gap-2 text-red-400" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;