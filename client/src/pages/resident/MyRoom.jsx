import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyRoom = () => {

  const [room, setRoom] = useState(null);
  const [residentId, setResidentId] = useState("");

  useEffect(() => {

    const fetchMyRoom = async () => {

      try {

        const res = await axios.get(
          "https://stay-hive.onrender.com/api/resident/my-room",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setRoom(res.data.room);
        setResidentId(res.data._id);

      } catch (error) {

        console.log(error);

      }

    };

    fetchMyRoom();

  }, []);

  const handleVacate = async () => {

    try {

      await axios.post(
        "https://stay-hive.onrender.com/api/room/vacate",
        { residentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Room vacated successfully");

      setRoom(null);

    } catch (error) {

      toast.error(error.response?.data?.message || "Error vacating room");

    }

  };

  if (!room || !room.roomNumber) {

    return (
      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          My Room
        </h1>

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 text-gray-500">
          You have not chosen a room yet.
        </div>

      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        My Room
      </h1>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 max-w-md">

        <h2 className="text-xl font-semibold mb-4">
          Room {room.roomNumber}
        </h2>

        <div className="space-y-2 text-gray-600">

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
          onClick={handleVacate}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg"
        >
          Vacate Room
        </button>

      </div>

    </div>

  );

};

export default MyRoom;