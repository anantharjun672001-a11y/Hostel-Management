import { useEffect, useState } from "react";
import axios from "axios";

const MyMaintenance = () => {

  const [requests,setRequests] = useState([]);

  useEffect(()=>{

    const fetchRequests = async ()=>{

      try{

        const res = await axios.get(
          "http://localhost:3000/api/maintenance/my",
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setRequests(res.data);

      }catch(error){

        console.log(error);

      }

    };

    fetchRequests();

  },[]);

  return(

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        My Maintenance Requests
      </h1>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

            <tr>

              <th className="px-6 py-3">Issue</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>

            </tr>

          </thead>

          <tbody>

            {requests.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center px-6 py-8 text-gray-500"
                >
                  No maintenance requests
                </td>

              </tr>

            ) : (

              requests.map((req)=>(

                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {req.issue}
                  </td>

                  <td className="px-6 py-4">
                    {req.room?.roomNumber}
                  </td>

                  <td className="px-6 py-4 capitalize">

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

                  <td className="px-6 py-4">

                    <span
                      className={
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full"
                          : req.status === "in-progress"
                          ? "bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                          : "bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                      }
                    >
                      {req.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {new Date(req.createdAt).toLocaleDateString()}
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

export default MyMaintenance;