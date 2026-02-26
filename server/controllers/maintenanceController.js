import Maintenance from "../models/Maintenance.js";
import Resident from "../models/Resident.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Create Request For Maintenance

export const createMaintenance = async (req,res) => {
    try {
        const resident = await Resident.findOne({userId:req.user.id});

        const request = await Maintenance.create({...req.body,resident:resident._id,room:resident.room});
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error Creating Maintenance" });
    }
}


//Get All Requests
export const getMaintenance = async (req,res) => {
    try {
        const requests = await Maintenance.find().populate("resident").populate("assignedTo");
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Requests" });
    }
}



//Update Status

export const updateStatus = async (req,res) => {
    try {
        const request = await Maintenance.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error Updating Status" });
    }
}