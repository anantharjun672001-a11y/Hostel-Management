import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Hostel Management System
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Manage hostel rooms, residents, billing, payments and maintenance
          easily with our modern hostel management platform.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Login
          </Link>

        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Room Management
            </h3>
            <p className="text-gray-600 text-sm">
              Easily create rooms, assign residents and track availability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Billing & Payments
            </h3>
            <p className="text-gray-600 text-sm">
              Generate bills and allow residents to pay online securely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Maintenance Requests
            </h3>
            <p className="text-gray-600 text-sm">
              Residents can raise maintenance requests and track status.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;