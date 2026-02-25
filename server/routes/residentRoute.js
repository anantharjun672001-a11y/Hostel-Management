import express from "express";
import { createResident, getResident, updateResident } from "../controllers/residentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",verifyToken,createResident);
router.get("/",verifyToken,getResident);
router.put("/",verifyToken,updateResident);


export default router;