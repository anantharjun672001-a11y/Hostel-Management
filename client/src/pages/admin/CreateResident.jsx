import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateResident = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    userId: "",
    phone: "",
    emergencyContact: "",
    address: "",
    checkIn: "",
    checkOut: ""
  });

  
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await axios.get(
          "http://localhost:3000/api/auth/residents",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        console.log(res.data);
        setUsers(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUsers();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/api/resident",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Resident created successfully");

      navigate("/admin/residents");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error creating resident"
      );

    }

  };

  return (

    <div className="p-6">

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-6">
          Create Resident
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* User Dropdown */}

          <select
            name="userId"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select User</option>

            {users.map((user) => (

              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>

            ))}

          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="text-sm font-medium">
            Check In Date
          </label>

          <input
            type="date"
            name="checkIn"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <label className="text-sm font-medium">
            Check Out Date
          </label>

          <input
            type="date"
            name="checkOut"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Resident
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateResident;