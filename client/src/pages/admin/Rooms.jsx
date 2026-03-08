import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:3000/api/room", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRooms(res.data);
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Room Management</h1>

        <Link
          to="/admin/rooms/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Room
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Room No</th>
              <th className="p-3">Type</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Occupied</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-t">

                <td className="p-3">{room.roomNumber}</td>
                <td className="p-3">{room.type}</td>
                <td className="p-3">{room.capacity}</td>
                <td className="p-3">{room.occupied}</td>

                <td className="p-3">
                  {room.occupied >= room.capacity ? (
                    <span className="text-red-500 font-semibold">Full</span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Rooms;