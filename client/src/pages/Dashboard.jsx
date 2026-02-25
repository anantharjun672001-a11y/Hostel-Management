import React from 'react';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import ResidentDashboard from './ResidentDashboard';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user.role === "admin") return <AdminDashboard />;
    if(user.role === "staff") return <StaffDashboard/>;
    return <ResidentDashboard/>;
};

export default Dashboard;