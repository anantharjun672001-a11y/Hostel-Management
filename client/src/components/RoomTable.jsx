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

              <td className="p-3 capitalize">{room.type}</td>

              <td className="p-3">{room.capacity}</td>

              <td className="p-3">{room.occupied}</td>

              <td className="p-3">

                {room.occupied >= room.capacity ? (

                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    Full
                  </span>

                ) : (

                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
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