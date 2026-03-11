import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateStaff = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {

    console.log("BUTTON CLICKED");

    try {

      const res = await axios.post(
        "https://stay-hive.onrender.com/api/admin/create-staff",
        data
      );

      toast.success(res.data.message);

      // clear form after success
      setData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {

      console.log("ERROR:", error);
      toast.error(error.response?.data?.message || "Error");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Staff
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={data.name}
              onChange={(e)=>setData({...data,name:e.target.value})}
              placeholder="Enter staff name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={data.email}
              onChange={(e)=>setData({...data,email:e.target.value})}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e)=>setData({...data,password:e.target.value})}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Create Staff
          </button>

        </div>

      </div>

    </div>

  );

};

export default CreateStaff;