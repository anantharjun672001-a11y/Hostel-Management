import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful");

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-gray-100">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register for Hostel Management
        </p>

        <div className="space-y-5">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Register
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;