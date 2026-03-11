import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRoom = () => {
  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://stay-hive.onrender.com/api/room/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 201) {
        toast.success("Room created successfully");
        navigate("/admin/rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating room");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>

            <input
              type="text"
              name="roomNumber"
              placeholder="Enter room number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>

            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
              <option value="quad">Quad</option>
              <option value="queen">Queen</option>
              <option value="king">King</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              placeholder="Enter capacity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Create Room
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateRoom;