import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUsers = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });

  const handleSubmit = async () => {

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

      // clear form
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        emergencyContact: "",
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

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Emergency Contact"
            value={data.emergencyContact}
            onChange={(e) => setData({ ...data, emergencyContact: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Resident
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateUsers;