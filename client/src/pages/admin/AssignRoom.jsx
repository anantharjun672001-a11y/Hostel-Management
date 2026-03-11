import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AssignRoom = () => {

  const navigate = useNavigate();

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

      await axios.post(
        "http://localhost:3000/api/room/assign",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Room assigned successfully");

      setForm({
        residentId: "",
        roomId: "",
      });

      // 🔥 NEW LOGIC
      navigate("/admin/rooms");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error assigning room"
      );

    }
  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Assign Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Resident
            </label>

            <select
              name="residentId"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Resident</option>

              {residents.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.userId?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Room
            </label>

            <select
              name="roomId"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Room</option>

              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.roomNumber} ({room.occupied}/{room.capacity})
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Assign Room
          </button>

        </form>

      </div>

    </div>
  );
};

export default AssignRoom;