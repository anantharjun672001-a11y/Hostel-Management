import Bill from "../models/Bill.js";
import Resident from "../models/Resident.js";
import dotenv from "dotenv";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";


dotenv.config();

//Create Bill

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
      Number(utilities) +
      Number(lateFee) -
      Number(discount);

    const bill = await Bill.create({
      resident: residentId,
      room: resident.room,
      month,
      rent,
      utilities,
      lateFee,
      discount,
      total,
      receipt: `${residentId}-${month.replace(/\s+/g, "")}`,
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


//Razorpay Payment

export const createOrder = async (req,res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        const options = {
            amount : bill.total * 100,
            currency : "INR",
            receipt : bill._id.toString(),
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Creating Order" });
    }
}


//Verify Payment

export const verifyPayment = async (req,res) => {
    try {
        
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if(razorpay_signature !== expected){
            return res.status(400).json({message:"Payment Failed"});
        }

        const bill = await Bill.findOne(receipt:razorpay_order_id);

        bill.status = "paid";
        bill.paymentDate = new Date();

        await bill.save();

        res.status(200).json({message:"Payment Successful"});

    } catch (error) {
        res.status(500).json({ message: "Error Verifying Payment" });
    }
}