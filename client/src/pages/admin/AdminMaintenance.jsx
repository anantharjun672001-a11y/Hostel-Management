import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMaintenance = () => {

  const [requests,setRequests] = useState([]);
  const [staff,setStaff] = useState([]);
  const [filter,setFilter] = useState("all");

  useEffect(()=>{
    fetchRequests();
    fetchStaff();
  },[filter]);

  const fetchRequests = async ()=>{

    try{

      let url = "http://localhost:3000/api/maintenance";

      if(filter === "pending"){
        url = "http://localhost:3000/api/maintenance/pending";
      }

      const res = await axios.get(url,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });

      setRequests(res.data);

    }catch(error){
      console.log(error);
    }

  };

  const fetchStaff = async ()=>{

    try{

      const res = await axios.get(
        "http://localhost:3000/api/auth/staff",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setStaff(res.data);

    }catch(error){
      console.log(error);
    }

  };

  const handleAssign = async (id,staffId)=>{

    try{

      await axios.put(
        `http://localhost:3000/api/maintenance/assign/${id}`,
        { staffId },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Staff assigned");

      fetchRequests();

    }catch(error){

      toast.error("Error assigning staff");

    }

  };

  const updateStatus = async (id,status)=>{

    try{

      await axios.put(
        `http://localhost:3000/api/maintenance/status/${id}`,
        { status },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Status updated");

      fetchRequests();

    }catch(error){

      toast.error("Error updating status");

    }

  };

  return(

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Maintenance Dashboard
        </h1>

        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          className="border p-2 rounded"
        >

          <option value="all">All Requests</option>
          <option value="pending">Pending Requests</option>

        </select>

      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-3">Resident</th>
              <th className="p-3">Room</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Assign Staff</th>
              <th className="p-3">Update Status</th>

            </tr>

          </thead>

          <tbody>

            {requests.length === 0 ? (

              <tr>
                <td colSpan="8" className="text-center p-4">
                  No maintenance requests
                </td>
              </tr>

            ) : (

              requests.map((req)=>(

                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {req.resident?.userId?.name}
                  </td>

                  <td className="p-3">
                    {req.room?.roomNumber}
                  </td>

                  <td className="p-3">
                    {req.issue}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        req.priority === "high"
                          ? "text-red-600 font-medium"
                          : req.priority === "medium"
                          ? "text-yellow-600 font-medium"
                          : "text-green-600 font-medium"
                      }
                    >
                      {req.priority}
                    </span>

                  </td>

                  <td className="p-3 capitalize">
                    {req.status}
                  </td>

                  <td className="p-3">

                    {req.assignedTo
                      ? req.assignedTo.name
                      : "Not Assigned"}

                  </td>

                  <td className="p-3">

                    <select
                      onChange={(e)=>handleAssign(req._id,e.target.value)}
                      className="border p-1 rounded"
                    >

                      <option value="">
                        Select Staff
                      </option>

                      {staff.map((s)=>(
                        <option
                          key={s._id}
                          value={s._id}
                        >
                          {s.name}
                        </option>
                      ))}

                    </select>

                  </td>

                  <td className="p-3">

                    <select
                      onChange={(e)=>updateStatus(req._id,e.target.value)}
                      className="border p-1 rounded"
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