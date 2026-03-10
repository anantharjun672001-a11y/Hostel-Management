import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

<nav className="bg-blue-200 border-b border-gray-200 shadow-sm">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

    {/* Logo */}
    <Link to="/" className="text-xl font-bold text-blue-600">
      StayHive
    </Link>

    {/* Menu */}
    <div className="flex items-center gap-4">

      <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
        Dashboard
      </Link>

      {/* ADMIN NAVBAR */}
      {role === "admin" && (
        <>
          <Link to="/admin/rooms" className="hover:text-blue-600">
            Rooms
          </Link>

          <Link to="/admin/rooms/create" className="hover:text-blue-600">
            Create Room
          </Link>

          <Link to="/admin/rooms/assign" className="hover:text-blue-600">
            Assign Room
          </Link>

          <Link to="/admin/residents" className="hover:text-blue-600">
            Residents
          </Link>

          <Link to="/admin/residents/create" className="hover:text-blue-600">
            Create Resident
          </Link>

          <Link to="/admin/bills" className="hover:text-blue-600">
            Bills
          </Link>

          <Link to="/admin/create-bill" className="hover:text-blue-600">
            Create Bill
          </Link>

          <Link to="/admin/payments" className="hover:text-blue-600">
            Payments
          </Link>

          <Link to="/admin/revenue" className="hover:text-blue-600">
            Revenue
          </Link>

          <Link to="/admin/maintenance" className="hover:text-blue-600">
            Maintenance
          </Link>
        </>
      )}

      {/* RESIDENT NAVBAR */}
      {role === "resident" && (
        <>
          <Link to="/resident/rooms" className="hover:text-blue-600">
            Rooms
          </Link>

          <Link to="/resident/my-room" className="hover:text-blue-600">
            My Room
          </Link>

          <Link to="/resident/bills" className="hover:text-blue-600">
            My Bills
          </Link>

          <Link to="/resident/maintenance" className="hover:text-blue-600">
            Maintenance
          </Link>

          <Link to="/resident/maintenance/create" className="hover:text-blue-600">
            Create Request
          </Link>
        </>
      )}

      {/* Notification Bell */}
      {user && <NotificationBell />}

      {/* Logout */}
      {user && (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      )}

      {!user && (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
        >
          Login
        </Link>
      )}

    </div>
  </div>
</nav>

  );
};

export default Navbar;