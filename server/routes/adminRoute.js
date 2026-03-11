import express from "express";
import {createStaff, createUser} from "../controllers/adminController.js";


const router = express.Router();

router.post("/create-resident",createUser);
router.post("/create-staff",createStaff);

export default router;