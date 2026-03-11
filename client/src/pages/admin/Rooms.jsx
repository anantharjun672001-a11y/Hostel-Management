import { Link } from "react-router-dom";
import RoomTable from "../../components/RoomTable";

const Rooms = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Room Management
      </h1>

      {/* Action Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Create Room (Admin + Staff) */}

        <Link
          to="/admin/rooms/create"
          className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Create Room
          </h2>

          <p className="text-sm text-gray-500">
            Add new rooms to the hostel and manage capacity.
          </p>
        </Link>

        {/* Assign Room (Admin Only) */}

        {role === "admin" && (

          <Link
            to="/admin/rooms/assign"
            className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Assign Room
            </h2>

            <p className="text-sm text-gray-500">
              Assign residents to available hostel rooms.
            </p>
          </Link>

        )}

      </div>

      {/* Room Table */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          All Rooms
        </h2>

        <RoomTable />

      </div>

    </div>
  );
};

export default Rooms;