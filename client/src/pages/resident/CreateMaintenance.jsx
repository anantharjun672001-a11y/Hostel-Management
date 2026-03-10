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
        "http://localhost:3000/api/maintenance",
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

    <div className="p-6">

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-6">
          Create Maintenance Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <textarea
            name="issue"
            placeholder="Describe your issue"
            value={form.issue}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateMaintenance;