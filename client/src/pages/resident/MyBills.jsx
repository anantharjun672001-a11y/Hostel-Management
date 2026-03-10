import { useEffect, useState } from "react";
import axios from "axios";

const MyBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/bill/my", {
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

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "invoice.pdf");

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bills</h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Month</th>
              <th className="p-3">Room</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No bills found
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr
                  key={bill._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{bill.month}</td>

                  <td className="p-3">{bill.resident?.room?.roomNumber || "-"}</td>

                  <td className="p-3 font-semibold">₹{bill.total}</td>

                  <td className="p-3">
                    <span
                      className={
                        bill.status === "paid"
                          ? "px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                          : "px-3 py-1 rounded-full text-sm bg-red-100 text-red-700"
                      }
                    >
                      {bill.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => downloadInvoice(bill._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

export default MyBills;
