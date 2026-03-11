import { useEffect, useState } from "react";
import axios from "axios";

const RoomTable = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const res = await axios.get(
          "http://localhost:3000/api/room",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRooms(res.data);

      } catch (error) {
        console.log(error);
      }

    };

    fetchRooms();

  }, []);

  return (

    <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

      <table className="w-full text-sm text-left text-gray-600">

        <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

          <tr>
            <th className="px-6 py-3">Room No</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Capacity</th>
            <th className="px-6 py-3">Occupied</th>
            <th className="px-6 py-3">Status</th>
          </tr>

        </thead>

        <tbody>

          {rooms.map((room) => (

            <tr
              key={room._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-6 py-4 font-medium text-gray-900">
                {room.roomNumber}
              </td>

              <td className="px-6 py-4 capitalize">
                {room.type}
              </td>

              <td className="px-6 py-4">
                {room.capacity}
              </td>

              <td className="px-6 py-4">
                {room.occupied}
              </td>

              <td className="px-6 py-4">

                {room.occupied >= room.capacity ? (

                  <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                    Full
                  </span>

                ) : (

                  <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                    Available
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default RoomTable;