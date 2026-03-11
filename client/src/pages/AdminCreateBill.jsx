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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.residentId || !form.month || !form.rent) {
      alert("Please fill required fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/bill",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Bill created successfully");

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

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Bill
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Resident
            </label>

            <select
              name="residentId"
              value={form.residentId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Resident</option>

              {residents.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.userId?.name}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>

            <input
              name="month"
              type="month"
              value={form.month}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent
              </label>

              <input
                name="rent"
                value={form.rent}
                placeholder="Rent amount"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Utilities
              </label>

              <input
                name="utilities"
                value={form.utilities}
                placeholder="Utilities charges"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Late Fee
              </label>

              <input
                name="lateFee"
                value={form.lateFee}
                placeholder="Late fee"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount
              </label>

              <input
                name="discount"
                value={form.discount}
                placeholder="Discount"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Create Bill
          </button>

        </form>

      </div>

    </div>

  );
};

export default AdminCreateBill;