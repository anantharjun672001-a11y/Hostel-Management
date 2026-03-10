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

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Maintenance Requests
      </h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-3">Issue</th>
              <th className="p-3">Room</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>

            </tr>

          </thead>

          <tbody>

            {requests.map((req)=>(

              <tr
                key={req._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {req.issue}
                </td>

                <td className="p-3">
                  {req.room?.roomNumber}
                </td>

                <td className="p-3 capitalize">
                  {req.priority}
                </td>

                <td className="p-3">

                  <span
                    className={
                      req.status === "pending"
                        ? "text-yellow-600 font-medium"
                        : req.status === "in-progress"
                        ? "text-blue-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {req.status}
                  </span>

                </td>

                <td className="p-3">

                  {new Date(req.createdAt)
                    .toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default MyMaintenance;