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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Residents</h1>

        <Link
          to="/admin/residents/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Resident
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Room</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {residents.map((resident) => (
              <tr key={resident._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{resident.userId?.name}</td>

                <td className="p-3">{resident.phone}</td>

                <td className="p-3">
                  {resident.room ? resident.room.roomNumber : "Not Assigned"}
                </td>

                <td className="p-3">
                  {resident.checkIn
                    ? new Date(resident.checkIn).toLocaleDateString()
                    : "-"}
                </td>

   <td className="p-3">
  {resident.room ? (
    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
      Active
    </span>
  ) : (
    <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">
      Vacated
    </span>
  )}
</td>

                <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/residents/edit/${resident._id}`}
                    className="text-blue-600 hover:underline"
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
