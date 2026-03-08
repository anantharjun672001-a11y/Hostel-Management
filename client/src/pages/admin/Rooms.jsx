import { Link } from "react-router-dom";
import RoomTable from "../../components/RoomTable";

const Rooms = () => {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Room Management</h1>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <Link
          to="/admin/rooms/list"
          className="bg-white shadow p-6 rounded hover:shadow-lg text-center"
        >
          View Rooms
        </Link>

        <Link
          to="/admin/rooms/create"
          className="bg-white shadow p-6 rounded hover:shadow-lg text-center"
        >
          Create Room
        </Link>

        <Link
          to="/admin/rooms/assign"
          className="bg-white shadow p-6 rounded hover:shadow-lg text-center"
        >
          Assign Room
        </Link>

      </div>

      
      <RoomTable />

    </div>
  );
};

export default Rooms;