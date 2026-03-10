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
          `http://localhost:3000/api/resident/${id}`,
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
        `http://localhost:3000/api/resident/${id}`,
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

    <div className="p-6">

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-6">
          Edit Resident
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="emergencyContact"
            value={form.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
            required
          />

          <label className="text-sm font-medium">
            Check In
          </label>

          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <label className="text-sm font-medium">
            Check Out
          </label>

          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Resident
          </button>

        </form>

      </div>

    </div>

  );

};

export default EditResident;