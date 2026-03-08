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

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/create-bill" element={<AdminCreateBill />} />
            <Route path="/admin/rooms" element={<Rooms/>}/>
            <Route path="/admin/rooms/create" element={<CreateRoom/>}/>
            <Route path="/admin/rooms/assign" element={<AssignRoom />} />
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
