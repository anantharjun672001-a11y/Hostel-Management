import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateMaintenance = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    issue: "",
    priority: "medium"
  });

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
        "https://stay-hive.onrender.com/api/maintenance",
        form,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Maintenance request created");

      navigate("/resident/maintenance");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error creating request"
      );

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Maintenance Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Description
            </label>

            <textarea
              name="issue"
              placeholder="Describe your issue"
              value={form.issue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg"
          >
            Submit Request
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateMaintenance;