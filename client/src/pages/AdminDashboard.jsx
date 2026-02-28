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
        "http://localhost:3000/api/dashboard",
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

  if (!stats) return <p>Loading...</p>;

 
  const revenueData = [
    { name: "Revenue", value: stats.revenue },
  ];

  
  const occupancyData = [
    { name: "Occupied", value: stats.occupied },
    { name: "Available", value: stats.totalCapacity - stats.occupied },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2>Total Revenue</h2>
          <p>₹{stats.revenue}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2>Total Residents</h2>
          <p>{stats.totalResidents}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2>Occupied</h2>
          <p>{stats.occupied}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2>Pending Maintenance</h2>
          <p>{stats.pendingMaintenance}</p>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="mb-4">Revenue Overview</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="mb-4">Room Occupancy</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={occupancyData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
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