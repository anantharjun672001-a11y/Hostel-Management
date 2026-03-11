import axios from "axios";
import React, { useState } from "react";

const PayButton = ({ billId }) => {

  const [loading,setLoading] = useState(false);

  const handlePayment = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `https://stay-hive.onrender.com/api/bill/order/${billId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        handler: async function (response) {

          await axios.post(
            "https://stay-hive.onrender.com/api/bill/verify-payment",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment successful");
          window.location.reload();

        },

        theme: {
          color: "#2563eb",
        },

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.log("Payment error:", error?.response?.data || error.message);

      alert(error?.response?.data?.message || "Payment failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition text-white px-4 py-2 rounded-lg text-sm font-medium"
    >

      {loading ? "Processing..." : "Pay Now"}

    </button>

  );

};

export default PayButton;