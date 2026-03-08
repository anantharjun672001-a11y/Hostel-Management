import Resident from "../models/Resident.js";
import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create Resident
export const createResident = async (req, res) => {
    try {
        const resident = await Resident.create({userId:req.user.id,...req.body});
        res.status(201).json(resident);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Creating Resident" });
    }
}

//Get Residents

export const getResident = async (req, res) => {
  try {
    const residents = await Resident.find().populate("userId", "name");

    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching residents" });
  }
};


// Update Resident

export const updateResident = async (req,res) => {
    try {
        const resident = await Resident.findOneAndUpdate({userId:req.user.id},req.body,{new:true});
        res.status(200).json(resident);
    } catch (error) {
        res.status(500).json({ message: "Error Updating Resident" });
    }
}