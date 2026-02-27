import Bill from "../models/Bill.js";
import Resident from "../models/Resident.js";
import dotenv from "dotenv";

dotenv.config();

//Create Bill

export const createBill = async (req, res) => {
  try {
    const { residentId, month, rent, utilities, lateFee, discount } = req.body;

    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    const total =
      Number(rent) + Number(utilities) + Number(lateFee) - Number(discount);

    const bill = await Bill.create({
      resident: residentId,
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

//Get All Bills(Admin)

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("resident").populate("room");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Bills" });
  }
};

//Resident Own Bill

export const getMyBill = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });
    if (!resident) {
      return res.status(404).json({ message: "Resident Not Found" });
    }
    const bill = await Bill.findOne({ resident: resident._id }).populate(
      "room",
    );
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Your Bills" });
  }
};

//Mark As Paid

import Resident from "../models/Resident.js";

export const payBill = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });

    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Prevent others paying
    if (bill.resident.toString() !== resident._id.toString()) {
      return res.status(403).json({ message: "Not your bill" });
    }

    if (bill.status === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    bill.status = "paid";
    bill.paymentDate = new Date();

    await bill.save();

    res.json(bill);

  } catch {
    res.status(500).json({ message: "Payment error" });
  }
};


//Payment History


export const paymentHistory = async (req,res) => {
    try {
        const resident = await Resident.findOne({userId:req.user.id});

        const history = await Bill.find({resident:resident._id,status:"paid"}).populate("room");

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Payment History" });
    }
}


//Revenue report

export const revenueReport = async (req,res) => {
    try {
        const revenue = await Bill.aggregate([
            { $match : { status : "paid"}},
            {
                $group : {
                    _id : null,
                    totalRevenue : {$sum : "$total"}
                }
            }
        ])

        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Revenue Report" });
    }
}