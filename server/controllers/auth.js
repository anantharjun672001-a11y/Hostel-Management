import User from "../models/User.js";
import Resident from "../models/Resident.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register User
export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });
    if (role === "resident") {
      await Resident.create({
        userId: user._id,
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

//Login User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//get users for residrnt

export const getResidentUsers = async (req, res) => {
  try {
    const residents = await Resident.find().select("userId");

    const residentUserIds = residents.map((r) => r.userId);

    const users = await User.find({
      role: "resident",
      _id: { $nin: residentUserIds },
    }).select("name email");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching users" });
  }
};

//get Staff

export const getStaffUsers = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }).select("name email");

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff" });
  }
};
