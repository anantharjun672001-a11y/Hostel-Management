import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUsers = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://stay-hive.onrender.com/api/admin/create-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);

      setData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || "Error");

    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Resident User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full border p-2 rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border p-2 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full border p-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Resident
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateUsers;