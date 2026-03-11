import { useEffect, useState } from "react";
import axios from "axios";

const MyBills = () => {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {

    try {

      const res = await axios.get(
        "https://stay-hive.onrender.com/api/bill/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBills(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const downloadInvoice = async (billId) => {

    try {

      const res = await axios.get(
        `https://stay-hive.onrender.com/api/bill/invoice/${billId}`,
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

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        My Bills
      </h1>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

            <tr>

              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Invoice</th>

            </tr>

          </thead>

          <tbody>

            {bills.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center px-6 py-8 text-gray-500"
                >
                  No bills found
                </td>

              </tr>

            ) : (

              bills.map((bill) => (

                <tr
                  key={bill._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium">
                    {bill.month}
                  </td>

                  <td className="px-6 py-4">
                    {bill.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-blue-600">
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

export default MyBills;