import crypto from "crypto";
import Payment from "../models/Payment.js";
import Bill from "../models/Bill.js"

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    
    const event = req.body.event;

    if (event === "payment.captured") {
      const paymentData = req.body.payload.payment.entity;

      const {
        id: paymentId,
        order_id: orderId,
        amount,
        method
      } = paymentData;

      
      const billId = paymentData.notes.billId;
      const residentId = paymentData.notes.residentId;

     
      await Payment.create({
        residentId,
        billId,
        amount: amount / 100,
        paymentId,
        orderId,
        status: "Success",
        method
      });

      
      await Bill.findByIdAndUpdate(billId, {
        status: "Paid"
      });

      console.log("Payment saved successfully");
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Webhook error" });
  }
};