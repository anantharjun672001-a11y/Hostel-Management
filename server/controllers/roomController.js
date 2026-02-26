import Room from "../models/Room.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create Room

export const createRoom = async (req,res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error Creating Room" });
    }
}


//Get all Rooms

export const getRooms = async (req,res) => {
    try {
        const rooms = await Room.find().populate("residents");
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Rooms" });
    }
}



//Assign Resident to Room

export const assignRoom = async (req,res) => {
    try {
        const {roomId,residentId} = req.body;
        const room = await Room.findById(roomId);

        if(!room){
            return res.status(404).json({message:"Room Not Found"});
        }

        if(room.occupied >= room.capacity){
            return res.status(400).json({message:"Room is Full"});
        }

        room.residents.push(residentId);
        room.occupied +=1;

        await room.save();
        res.status(200).json(room);


    } catch (error) {
        res.status(500).json({ message: "Error Assigning Room" });
    }
}


// Vacate Room

export const vacateRoom = async (req,res) => {
    try {
        const {roomId,residentId} = req.body;

        const room = await Room.findById(roomId);

        room.residents = room.residents.filter((r) => r.toString() !== residentId);

        room.occupied -=1;

        await room.save();
        res.status(200).json(room);
        
    } catch (error) {
        res.status(500).json({ message: "Error Vacating Room" });
    }
}