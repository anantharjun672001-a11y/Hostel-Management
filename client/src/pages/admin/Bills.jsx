import { useEffect, useState } from "react";
import axios from "axios";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/bill", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoice = async (billId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/bill/invoice/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        },
      );

      const blob = new Blob([res.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `invoice-${billId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBills = bills.filter((bill) => {
    if (filter === "all") return true;
    return bill.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          All Bills
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

            <tr>
              <th className="px-6 py-3">Resident</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Invoice</th>
            </tr>

          </thead>

          <tbody>

            {filteredBills.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center px-6 py-8 text-gray-500"
                >
                  No bills found
                </td>

              </tr>

            ) : (

              filteredBills.map((bill) => (

                <tr
                  key={bill._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {bill.resident?.userId?.name || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {bill.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(bill.month + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{bill.total}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={
                        bill.status === "paid"
                          ? "bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full"
                          : "bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full"
                      }
                    >
                      {bill.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() => downloadInvoice(bill._id)}
                      className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-3 py-1.5 rounded-lg"
                    >
                      Download
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Bills;