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
          "https://stay-hive.onrender.com/api/auth/residents",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

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
        "https://stay-hive.onrender.com/api/resident",
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

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Resident
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User Dropdown */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>

            <select
              name="userId"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select User</option>

              {users.map((user) => (

                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact
            </label>

            <input
              type="text"
              name="emergencyContact"
              placeholder="Enter emergency contact"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check In Date
              </label>

              <input
                type="date"
                name="checkIn"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check Out Date
              </label>

              <input
                type="date"
                name="checkOut"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Create Resident
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateResident;