import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMaintenance = () => {
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRequests();
    fetchStaff();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://stay-hive.onrender.com/api/maintenance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data;

      if (filter !== "all") {
        data = data.filter((req) => req.status === filter);
      }

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("https://stay-hive.onrender.com/api/auth/staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStaff(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async (id, staffId) => {
    try {
      await axios.put(
        `https://stay-hive.onrender.com/api/maintenance/assign/${id}`,
        { staffId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Staff assigned");

      fetchRequests();
    } catch (error) {
      toast.error("Error assigning staff");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://stay-hive.onrender.com/api/maintenance/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Status updated");

      fetchRequests();
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Maintenance Dashboard
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending Requests</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Resident</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Issue</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assigned</th>
              <th className="px-6 py-3">Assign Staff</th>
              <th className="px-6 py-3">Update Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center px-6 py-8 text-gray-500">
                  No maintenance requests
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {req.resident?.userId?.name}
                  </td>

                  <td className="px-6 py-4">{req.room?.roomNumber}</td>

                  <td className="px-6 py-4">{req.issue}</td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        req.priority === "high"
                          ? "text-red-600 font-semibold"
                          : req.priority === "medium"
                            ? "text-yellow-600 font-semibold"
                            : "text-green-600 font-semibold"
                      }
                    >
                      {req.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4 capitalize">{req.status}</td>

                  <td className="px-6 py-4">
                    {req.assignedTo ? req.assignedTo.name : "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      onChange={(e) => handleAssign(req._id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                      <option value="">Select Staff</option>

                      {staff.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      onChange={(e) => updateStatus(req._id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                      <option value="">Change Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMaintenance;
