import axios from "axios";
import React from "react";

const PayButton = ({ billId }) => {
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `http://localhost:3000/api/bill/order/${billId}`,
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
          console.log("Payment success response:", response);
          await axios.post("http://localhost:3000/api/bill/verify-payment", response, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Payment successful");
          window.location.reload();
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Payment error:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default PayButton;
