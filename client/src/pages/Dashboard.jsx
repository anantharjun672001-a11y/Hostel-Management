import React from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import ResidentDashboard from "./ResidentDashboard";

const Dashboard = () => {

  const userString = localStorage.getItem("user");

  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "staff") return <StaffDashboard />;
  if (user.role === "resident") return <ResidentDashboard />;

  return <Navigate to="/login" replace />;
};

export default Dashboard;