import { useEffect, useState } from "react";
import axios from "axios";

const Payments = () => {

  const [payments,setPayments] = useState([]);

  useEffect(()=>{

    fetchPayments();

  },[]);

  const fetchPayments = async ()=>{

    try{

      const res = await axios.get(
        "http://localhost:3000/api/bill/history",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setPayments(res.data);

    }catch(error){

      console.log(error);

    }

  };

  const downloadInvoice = async (billId)=>{

    try{

      const res = await axios.get(
        `http://localhost:3000/api/bill/invoice/${billId}`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          responseType:"blob"
        }
      );

      const blob = new Blob([res.data],{type:"application/pdf"});

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `invoice-${billId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

    }catch(error){

      console.log(error);

    }

  };

  return(

    <div className="max-w-7xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Payment History
      </h1>

      <div className="bg-white border border-gray-100 shadow-md rounded-xl overflow-x-auto">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">

            <tr>

              <th className="px-6 py-3">Resident</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Receipt</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Invoice</th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center px-6 py-8 text-gray-500"
                >
                  No payments found
                </td>

              </tr>

            ) : (

              payments.map((payment)=>(

                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.resident?.userId?.name}
                  </td>

                  <td className="px-6 py-4">
                    {payment.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(payment.month + "-01").toLocaleString("default",{
                      month:"long",
                      year:"numeric"
                    })}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{payment.total}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.receipt}
                  </td>

                  <td className="px-6 py-4">

                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={()=>downloadInvoice(payment._id)}
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

export default Payments;