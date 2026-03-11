import { useEffect, useState } from "react";
import axios from "axios";
import PayButton from "../components/PayButton";

const ResidentDashboard = () => {

  const [bills, setBills] = useState([]);

  useEffect(() => {

    const fetchBills = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:3000/api/bill/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBills(data || []);

      } catch (error) {

        console.log(error);

      }

    };

    fetchBills();

  }, []);

  const downloadInvoice = async (billId) => {

    try {

      const response = await axios.get(
        `http://localhost:3000/api/bill/invoice/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `invoice-${billId}.pdf`);

      document.body.appendChild(link);
      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Welcome Resident
      </h1>

      {bills.length > 0 ? (

        <div className="grid gap-6">

          {bills.map((bill) => {

            const normalizedStatus = (bill.status || bill.paymentStatus || "")
              .toString()
              .trim()
              .toLowerCase();

            const isPaid = ["paid", "success", "completed", "settled"]
              .includes(normalizedStatus);

            return (

              <div
                key={bill._id || bill.month}
                className="bg-white border border-gray-100 shadow-md rounded-xl p-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Month
                    </p>

                    <h2 className="text-lg font-semibold">
                      {bill.month}
                    </h2>

                  </div>

                  <span
                    className={
                      isPaid
                        ? "bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full"
                        : "bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full"
                    }
                  >
                    {isPaid ? "Paid" : "Unpaid"}
                  </span>

                </div>

                <p className="text-xl font-bold text-blue-600 mb-4">
                  ₹{bill.total}
                </p>

                <div className="flex gap-3">

                  {!isPaid && <PayButton billId={bill._id} />}

                  <button
                    onClick={() => downloadInvoice(bill._id)}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded-lg"
                  >
                    Download Invoice
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      ) : (

        <div className="text-gray-500">
          No bills found
        </div>

      )}

    </div>

  );

};

export default ResidentDashboard;