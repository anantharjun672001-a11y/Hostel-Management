import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateStaff = () => {

 const [data, setData] = useState({
  name: "",
  email: "",
  password: "",
 });

 const handleSubmit = async () => {

  try {

   const res = await axios.post(
    "https://stay-hive.onrender.com/api/admin/create-staff",
    data
   );

   toast.success(res.data.message);

  } catch (error) {

   toast.error(error.response?.data?.message || "Error");

  }

 };

 return (

  <div>

   <input
    placeholder="Name"
    onChange={(e)=>setData({...data,name:e.target.value})}
   />

   <input
    placeholder="Email"
    onChange={(e)=>setData({...data,email:e.target.value})}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>setData({...data,password:e.target.value})}
   />

   <button onClick={handleSubmit}>
    Create Staff
   </button>

  </div>

 );

};

export default CreateStaff;