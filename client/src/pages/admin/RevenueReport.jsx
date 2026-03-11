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
   <div className="max-w-7xl mx-auto p-6 text-gray-500">
    Loading revenue report...
   </div>
  );

 }

 return(

  <div className="max-w-7xl mx-auto p-6 space-y-8">

   <h1 className="text-3xl font-bold text-gray-800">
    Revenue Report
   </h1>

   {/* Stats Cards */}

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
     <p className="text-sm text-gray-500">
      Total Revenue
     </p>
     <h2 className="text-2xl font-bold text-green-600 mt-2">
      ₹{data.totalRevenue}
     </h2>
    </div>

    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
     <p className="text-sm text-gray-500">
      This Month
     </p>
     <h2 className="text-2xl font-bold text-blue-600 mt-2">
      ₹{data.thisMonthRevenue}
     </h2>
    </div>

    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
     <p className="text-sm text-gray-500">
      Paid Bills
     </p>
     <h2 className="text-2xl font-bold mt-2">
      {data.paidBills}
     </h2>
    </div>

    <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">
     <p className="text-sm text-gray-500">
      Pending Bills
     </p>
     <h2 className="text-2xl font-bold text-red-500 mt-2">
      {data.pendingBills}
     </h2>
    </div>

   </div>

   {/* Chart Section */}

   <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6">

    <h2 className="text-lg font-semibold text-gray-700 mb-4">
     Monthly Revenue
    </h2>

    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={data.monthlyRevenue}>

      <XAxis dataKey="_id"/>

      <YAxis/>

      <Tooltip/>

      <Bar dataKey="revenue" fill="#3b82f6"/>

     </BarChart>

    </ResponsiveContainer>

   </div>

  </div>

 );

};

export default RevenueReport;