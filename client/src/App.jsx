import React from "react";
import { ToastContainer }  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminCreateBill from "./pages/AdminCreateBill";
import Rooms from "./pages/admin/Rooms";
import CreateRoom from "./pages/admin/CreateRoom";
import AssignRoom from "./pages/admin/AssignRoom";
import AvailableRooms from "./pages/resident/AvailableRooms";
import MyRoom from "./pages/resident/MyRoom";
import CreateResident from "./pages/admin/CreateResident";
import Residents from "./pages/admin/Residents";
import EditResident from "./pages/admin/EditResident";
import CreateMaintenance from "./pages/resident/CreateMaintenance";
import MyMaintenance from "./pages/resident/MyMaintenance";
import AdminMaintenance from "./pages/admin/AdminMaintenance";
import MyBills from "./pages/resident/MyBills";
import Bills from "./pages/admin/Bills";
import Payments from "./pages/admin/Payments";
import RevenueReport from "./pages/admin/RevenueReport";
import CreateStaff from "./pages/admin/CreateStaff";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin/create-bill" element={<AdminCreateBill />} />
            <Route path="/admin/rooms" element={<Rooms/>}/>
            <Route path="/admin/rooms/create" element={<CreateRoom/>}/>
            <Route path="/admin/rooms/assign" element={<AssignRoom />} />
            <Route path="/resident/rooms" element={<AvailableRooms/>} />
            <Route path="/resident/my-room" element={<MyRoom />} />
            <Route path="/admin/residents" element={<Residents/>} />
            <Route path="/admin/residents/create" element={<CreateResident/>} />
            <Route path="/admin/residents/edit/:id" element={<EditResident />} />
            <Route path="/resident/maintenance/create" element={<CreateMaintenance />} />
            <Route path="/resident/maintenance" element={<MyMaintenance />} />
            <Route path="/admin/maintenance" element={<AdminMaintenance />} />
            <Route path="/resident/bills/" element={<MyBills/>} />
            <Route path="/admin/bills" element={<Bills/>} />
            <Route path="/admin/payments" element={<Payments/>} />
            <Route path="/admin/revenue" element={<RevenueReport/>} />
            <Route path="/admin/create-staff" element={<CreateStaff />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
