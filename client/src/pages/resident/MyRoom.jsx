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
          "http://localhost:3000/api/resident/my-room",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        console.log("API DATA:", res.data);

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
        "http://localhost:3000/api/room/vacate",
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
      <div className="p-6">
        <h1 className="text-2xl font-bold">My Room</h1>
        <p className="mt-4 text-gray-500">
          You have not chosen a room yet.
        </p>
      </div>
    );

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Room
      </h1>

      <div className="max-w-md bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-4">
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
          onClick={handleVacate}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Vacate Room
        </button>

      </div>

    </div>

  );

};

export default MyRoom;