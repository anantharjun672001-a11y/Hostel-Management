import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Residents = () => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/resident", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setResidents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResidents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Residents
        </h1>

        <Link
          to="/admin/residents/create"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Create Resident
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Check In</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {residents.map((resident) => (

              <tr
                key={resident._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 font-medium text-gray-900">
                  {resident.userId?.name}
                </td>

                <td className="px-6 py-4">
                  {resident.phone}
                </td>

                <td className="px-6 py-4">
                  {resident.room ? resident.room.roomNumber : "Not Assigned"}
                </td>

                <td className="px-6 py-4">
                  {resident.checkIn
                    ? new Date(resident.checkIn).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  {resident.room ? (
                    <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                      Vacated
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">

                  <Link
                    to={`/admin/residents/edit/${resident._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Residents;