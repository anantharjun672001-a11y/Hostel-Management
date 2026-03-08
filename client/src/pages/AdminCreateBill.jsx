import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCreateBill = () => {
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({
    residentId: "",
    month: "",
    rent: "",
    utilities: "",
    lateFee: "",
    discount: "",
  });

  // Fetch residents
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/resident",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResidents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResidents();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 basic validation
    if (!form.residentId || !form.month || !form.rent) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/bill",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Bill created successfully");

      // ✅ Reset form
      setForm({
        residentId: "",
        month: "",
        rent: "",
        utilities: "",
        lateFee: "",
        discount: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error creating bill");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Bill</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="residentId"
          value={form.residentId}
          onChange={handleChange}
          required
          className="w-full border p-2"
        >
          <option value="">Select Resident</option>
          {residents.map((r) => (
            <option key={r._id} value={r._id}>
              {r.userId?.name}
            </option>
          ))}
        </select>

        <input
          name="month"
          type="month"
          value={form.month}
          placeholder="Month"
          required
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="rent"
          value={form.rent}
          placeholder="Rent"
          required
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="utilities"
          value={form.utilities}
          placeholder="Utilities"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="lateFee"
          value={form.lateFee}
          placeholder="Late Fee"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="discount"
          value={form.discount}
          placeholder="Discount"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default AdminCreateBill;