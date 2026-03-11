import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get(
        "https://stay-hive.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard...
      </div>
    );

  const revenueData = [
    { name: "Revenue", value: stats.revenue },
  ];

  const occupancyData = [
    { name: "Occupied", value: stats.occupied },
    { name: "Available", value: stats.totalCapacity - stats.occupied },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">
            Total Revenue
          </h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹{stats.revenue}
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">
            Total Residents
          </h2>
          <p className="text-2xl font-bold mt-2">
            {stats.totalResidents}
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">
            Occupied Rooms
          </h2>
          <p className="text-2xl font-bold mt-2">
            {stats.occupied}
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">
            Pending Maintenance
          </h2>
          <p className="text-2xl font-bold text-red-500 mt-2">
            {stats.pendingMaintenance}
          </p>
        </div>

      </div>

      {/* Revenue Chart */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Revenue Overview
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Occupancy Chart */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Room Occupancy
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={occupancyData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {occupancyData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminDashboard;