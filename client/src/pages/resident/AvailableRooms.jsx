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

      // refresh rooms
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

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Available Rooms
      </h1>

      {rooms.length === 0 ? (

        <p className="text-gray-500">
          No rooms available
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {rooms.map((room) => (

            <div
              key={room._id}
              className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition"
            >

              <h2 className="text-lg font-semibold mb-2">
                Room {room.roomNumber}
              </h2>

              <p className="text-gray-600">
                Type: {room.type}
              </p>

              <p className="text-gray-600">
                Capacity: {room.capacity}
              </p>

              <p className="text-gray-600 mb-4">
                Occupied: {room.occupied}/{room.capacity}
              </p>

              <button
                onClick={() => handleChooseRoom(room._id)}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
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