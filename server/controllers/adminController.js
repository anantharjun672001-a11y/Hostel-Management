import User from "../models/User.js";
import Resident from "../models/Resident.js";
import bcrypt from "bcrypt";

export const createResident = async (req, res) => {

 try {

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
   return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
   name,
   email,
   password: hashed,
   role: "resident",
  });

  await Resident.create({
   userId: user._id,
  });

  res.status(201).json({
   message: "Resident created successfully",
  });

 } catch (error) {

  console.log(error);
  res.status(500).json({ message: "Server error" });

 }

};


//Create Staff

export const createStaff = async (req, res) => {

 try {

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
   return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const staff = await User.create({
   name,
   email,
   password: hashed,
   role: "staff",
  });

  res.status(201).json({
   message: "Staff created successfully",
   staff,
  });

 } catch (error) {

  console.log(error);
  res.status(500).json({ message: "Server error" });

 }

};