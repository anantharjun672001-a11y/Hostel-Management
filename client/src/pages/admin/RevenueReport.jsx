import { useEffect,useState } from "react";
import axios from "axios";
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

const RevenueReport = ()=>{

 const [data,setData] = useState(null);

 useEffect(()=>{

  fetchRevenue();

 },[]);

 const fetchRevenue = async ()=>{

  try{

   const res = await axios.get(
    "http://localhost:3000/api/bill/report",
    {
     headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
     }
    }
   );

   setData(res.data);

  }catch(error){

   console.log(error);

  }

 };

 if(!data){

  return(
   <div className="p-6">
    Loading...
   </div>
  );

 }

 return(

  <div className="p-6 space-y-8">

   <h1 className="text-2xl font-bold">
    Revenue Report
   </h1>

   {/* Cards */}

   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    <div className="bg-white shadow p-5 rounded-lg">
     <p className="text-gray-500">Total Revenue</p>
     <h2 className="text-2xl font-bold text-green-600">
      ₹{data.totalRevenue}
     </h2>
    </div>

    <div className="bg-white shadow p-5 rounded-lg">
     <p className="text-gray-500">This Month</p>
     <h2 className="text-2xl font-bold text-blue-600">
      ₹{data.thisMonthRevenue}
     </h2>
    </div>

    <div className="bg-white shadow p-5 rounded-lg">
     <p className="text-gray-500">Paid Bills</p>
     <h2 className="text-2xl font-bold">
      {data.paidBills}
     </h2>
    </div>

    <div className="bg-white shadow p-5 rounded-lg">
     <p className="text-gray-500">Pending Bills</p>
     <h2 className="text-2xl font-bold text-red-500">
      {data.pendingBills}
     </h2>
    </div>

   </div>

   {/* Chart */}

   <div className="bg-white p-6 rounded-lg shadow">

    <h2 className="text-lg font-semibold mb-4">
     Monthly Revenue
    </h2>

    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={data.monthlyRevenue}>

      <XAxis dataKey="_id"/>

      <YAxis/>

      <Tooltip/>

      <Bar dataKey="revenue"/>

     </BarChart>

    </ResponsiveContainer>

   </div>

  </div>

 );

};

export default RevenueReport;