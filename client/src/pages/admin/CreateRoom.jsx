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
        "http://localhost:3000/api/room/create",
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
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <select
          name="type"
          className="w-full border p-2"
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
          <option value="quad">Quad</option>
          <option value="queen">Queen</option>
          <option value="king">King</option>
        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
