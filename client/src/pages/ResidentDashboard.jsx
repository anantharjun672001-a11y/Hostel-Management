import { useEffect, useState } from "react";
import axios from "axios";
import PayButton from "../components/PayButton";

const ResidentDashboard = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/bill/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBills(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div>
      <h1>Welcome Resident</h1>

      {bills.length > 0 ? (
        bills.map((bill) => {
          const normalizedStatus = (bill.status || bill.paymentStatus || "")
            .toString()
            .trim()
            .toLowerCase();

          const isPaid = ["paid", "success", "completed", "settled"].includes(
            normalizedStatus
          );

          return (
            <div key={bill._id || bill.month} style={{ marginBottom: "16px" }}>
              <p>{bill.month}</p>
              <p>{bill.total}</p>
              {!isPaid && <PayButton billId={bill._id} />}
            </div>
          );
        })
      ) : (
        <p>No bills found</p>
      )}
    </div>
  );
};

export default ResidentDashboard;
