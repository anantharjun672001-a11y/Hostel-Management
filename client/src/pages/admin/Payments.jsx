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

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Payment History
      </h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-3">Resident</th>
              <th className="p-3">Room</th>
              <th className="p-3">Month</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Date</th>
              <th className="p-3">Invoice</th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No payments found
                </td>
              </tr>

            ) : (

              payments.map((payment)=>(

                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {payment.resident?.userId?.name}
                  </td>

                  <td className="p-3">
                    {payment.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="p-3">
                    {new Date(payment.month + "-01").toLocaleString("default",{
                      month:"long",
                      year:"numeric"
                    })}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{payment.total}
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {payment.receipt}
                  </td>

                  <td className="p-3">

                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}

                  </td>

                  <td className="p-3">

                    <button
                      onClick={()=>downloadInvoice(payment._id)}
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

export default Payments;