import express from "express";
import {createResident,createStaff} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-resident",createResident);
router.post("/create-staff",createStaff);

export default router;