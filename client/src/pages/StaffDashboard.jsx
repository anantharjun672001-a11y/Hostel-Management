import { useEffect, useState } from "react";
import axios from "axios";

const StaffDashboard = () => {

  const [stats,setStats] = useState({
    total:0,
    pending:0,
    inprogress:0,
    resolved:0
  });

  useEffect(()=>{

    fetchTasks();

  },[]);

  const fetchTasks = async ()=>{

    try{

      const res = await axios.get(
        "http://localhost:3000/api/maintenance",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(res.data); 

      const data = res.data;

      setStats({
        total:data.length,
        pending:data.filter(t=>t.status==="pending").length,
        inprogress:data.filter(t=>t.status==="in-progress").length,
        resolved:data.filter(t=>t.status==="resolved").length
      });

    }catch(error){

      console.log(error);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Staff Dashboard
      </h1>

     

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-2xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500">In Progress</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {stats.inprogress}
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500">Resolved</p>
          <h2 className="text-2xl font-bold text-green-600">
            {stats.resolved}
          </h2>
        </div>

      </div>

      

      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-3">
          Quick Action
        </h2>

        <p className="text-gray-500 mb-4">
          View and manage your assigned maintenance tasks.
        </p>

        <a
          href="/admin/maintenance"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Maintenance
        </a>

      </div>

    </div>

  );

};

export default StaffDashboard;