import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://stay-hive.onrender.com/api/auth/login",
        data,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Hostel Management
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to your account
        </p>

        <p>
          If login takes time, please wait 30–60 seconds as the backend server
          may be waking up from sleep.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-5 text-sm text-gray-700">
          <p className="font-semibold mb-2">Demo Credentials:</p>

          <p>
            <b>Admin</b>
          </p>
          <p>Email: anantharjun672001@gmail.com</p>
          <p>Password: Ananthraj</p>

          <p className="mt-2">
            <b>Staff</b>
          </p>
          <p>Email: rahul@gmail.com</p>
          <p>Password: Rahul</p>

          <p className="mt-2">
            <b>Resident</b>
          </p>
          <p>Email: sesha@gmail.com</p>
          <p>Password: Sesha</p>

          <p className="mt-2">
            <b>Common User</b>
          </p>
          <p>Email: kumar@gmail.com</p>
          <p>Password: 123456</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
