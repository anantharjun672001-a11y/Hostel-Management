import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditResident = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    emergencyContact: "",
    address: "",
    checkIn: "",
    checkOut: ""
  });

  useEffect(() => {

    const fetchResident = async () => {

      try {

        const res = await axios.get(
          `https://stay-hive.onrender.com/api/resident/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setForm({
          phone: res.data.phone || "",
          emergencyContact: res.data.emergencyContact || "",
          address: res.data.address || "",
          checkIn: res.data.checkIn
            ? res.data.checkIn.split("T")[0]
            : "",
          checkOut: res.data.checkOut
            ? res.data.checkOut.split("T")[0]
            : ""
        });

      } catch (error) {

        console.log(error);
        toast.error("Error fetching resident");

      }

    };

    fetchResident();

  }, [id]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `https://stay-hive.onrender.com/api/resident/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Resident updated successfully");

      navigate("/admin/residents");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error updating resident"
      );

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Resident
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
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
              value={form.emergencyContact}
              onChange={handleChange}
              placeholder="Enter emergency contact"
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
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
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
                value={form.checkIn}
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
                value={form.checkOut}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Update Resident
          </button>

        </form>

      </div>

    </div>

  );

};

export default EditResident;