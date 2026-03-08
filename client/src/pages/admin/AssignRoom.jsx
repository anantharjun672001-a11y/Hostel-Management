import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AssignRoom = () => {
  const [residents, setResidents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    residentId: "",
    roomId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const resResidents = await axios.get(
        "http://localhost:3000/api/resident",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const resRooms = await axios.get(
        "http://localhost:3000/api/room/available",
      );

      setResidents(resResidents.data);
      setRooms(resRooms.data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/room/assign", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Room assigned successfully");

      setForm({
        residentId: "",
        roomId: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error assigning room");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-6">Assign Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="residentId"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Resident</option>

          {residents.map((r) => (
            <option key={r._id} value={r._id}>
              {r.userId?.name}
            </option>
          ))}
        </select>

        <select
          name="roomId"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Room</option>

          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              Room {room.roomNumber} ( {room.occupied}/{room.capacity} )
            </option>
          ))}
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Assign Room
        </button>
      </form>
    </div>
  );
};

export default AssignRoom;
