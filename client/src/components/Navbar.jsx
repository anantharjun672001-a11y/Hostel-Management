import React from "react";
import NotificationBell from "./NotificationBell";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(JSON.parse(localStorage.getItem("user")));

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-bold">Hostel Management</h1>

        <div className="flex items-center gap-6">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/admin/rooms">Rooms</Link>

          {user?.role === "admin" && (
            <Link
              to="/admin/create-bill"
              className="hover:text-gray-200 transition"
            >
              Create Bill
            </Link>
          )}
          <Link to="/resident/my-room">My Room</Link>
          <Link to="/maintenance">Maintenance</Link>

          <NotificationBell />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
