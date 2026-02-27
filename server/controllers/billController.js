import Bill from "../models/Bill.js";
import Resident from "../models/Resident.js";
import dotenv from "dotenv";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";

dotenv.config();


// Create Bill
export const createBill = async (req, res) => {
  try {
    const { residentId, month, rent, utilities, lateFee, discount } = req.body;

    if (!residentId || !month || !rent) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const resident = await Resident.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    const existingBill = await Bill.findOne({ resident: residentId, month });
    if (existingBill) {
      return res
        .status(400)
        .json({ message: "Bill already exists for this month" });
    }

    const total =
      Number(rent) +
      Number(utilities || 0) +
      Number(lateFee || 0) -
      Number(discount || 0);

    const bill = await Bill.create({
      resident: residentId,
      room: resident.room,
      month,
      rent,
      utilities,
      lateFee,
      discount,
      total,
      createdBy: req.user.id,
    });

    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Creating Bill",
      error: error.message,
    });
  }
};


// Get All Bills (Admin)
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("resident").populate("room");
    res.status(200).json(bills);
  } catch {
    res.status(500).json({ message: "Error Fetching Bills" });
  }
};


// Resident Bills
export const getMyBill = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });
    const bills = await Bill.find({ resident: resident._id });
    res.json(bills);
  } catch {
    res.status(500).json({ message: "Error fetching your bills" });
  }
};


// Payment History
export const paymentHistory = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });

    const history = await Bill.find({
      resident: resident._id,
      status: "paid",
    }).populate("room");

    res.status(200).json(history);
  } catch {
    res.status(500).json({ message: "Error Fetching Payment History" });
  }
};


// Revenue Report
export const revenueReport = async (req, res) => {
  try {
    const revenue = await Bill.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    res.status(200).json(revenue);
  } catch {
    res.status(500).json({ message: "Error Fetching Revenue Report" });
  }
};


// Razorpay → Create Order
export const createOrder = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (bill.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    const options = {
      amount: bill.total * 100,
      currency: "INR",
      receipt: bill._id.toString(),
    };

    const order = await razorpay.orders.create(options);

   
    bill.receipt = order.id;
    await bill.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating Order" });
  }
};


// Razorpay → Verify Payment


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 🔥 Find bill using saved order id
    const bill = await Bill.findOne({ receipt: razorpay_order_id });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    bill.status = "paid";
    bill.paymentDate = new Date();

    await bill.save();

    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error Verifying Payment", error: error.message });
  }
};