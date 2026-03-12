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

<nav className="bg-gray-300 border-b border-gray-200 shadow-sm">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

    <Link to="/" className="text-xl font-bold text-blue-600">
      StayHive
    </Link>

    <div className="flex items-center gap-4">

      {/* Dashboard only after login */}
      {user && (
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
          Dashboard
        </Link>
      )}

      {/* ADMIN + STAFF NAVBAR */}
      {user && (role === "admin" || role === "staff") && (
        <>
          <Link to="/admin/rooms" className="hover:text-blue-600">
            Rooms
          </Link>

          <Link to="/admin/residents" className="hover:text-blue-600">
            Residents
          </Link>

          <Link to="/admin/maintenance" className="hover:text-blue-600">
            Maintenance
          </Link>
        </>
      )}

      {/* ADMIN ONLY */}
      {user && role === "admin" && (
        <>
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

          <Link to="/admin/create-staff" className="hover:text-blue-600">
            Create Staff
          </Link>
          <Link to="/admin/create-user"  className="hover:text-blue-600">
            Create User
          </Link>
        </>
      )}

      {/* RESIDENT NAVBAR */}
      {user && role === "resident" && (
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

          <Link to="/resident/maintenance/create" className="hover:text-blue-600">
            Create Request
          </Link>

          <Link to="/resident/maintenance" className="hover:text-blue-600">
            Maintenance
          </Link>
        </>
      )}

      {/* Notification */}
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

      {/* Login button */}
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