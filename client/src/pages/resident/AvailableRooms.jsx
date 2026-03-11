import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AvailableRooms = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const res = await axios.get(
          "http://localhost:3000/api/room/available"
        );

        setRooms(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchRooms();

  }, []);

  const handleChooseRoom = async (roomId) => {

    try {

      await axios.post(
        "http://localhost:3000/api/room/assign",
        {
          roomId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Room assigned successfully");

      const res = await axios.get(
        "http://localhost:3000/api/room/available"
      );

      setRooms(res.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error choosing room"
      );

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Available Rooms
      </h1>

      {rooms.length === 0 ? (

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 text-gray-500">
          No rooms available
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room) => (

            <div
              key={room._id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >

              <h2 className="text-lg font-semibold mb-3">
                Room {room.roomNumber}
              </h2>

              <div className="space-y-1 text-gray-600 text-sm">

                <p>
                  <span className="font-medium">Type:</span> {room.type}
                </p>

                <p>
                  <span className="font-medium">Capacity:</span> {room.capacity}
                </p>

                <p>
                  <span className="font-medium">Occupied:</span> {room.occupied}/{room.capacity}
                </p>

              </div>

              <button
                onClick={() => handleChooseRoom(room._id)}
                className="mt-5 w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg"
              >
                Choose Room
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default AvailableRooms;