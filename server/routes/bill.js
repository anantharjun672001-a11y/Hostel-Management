import express from "express";
import { allowRoles, verifyToken } from "../middleware/authMiddleware.js";
import { createBill, getBills, getMyBill, payBill } from "../controllers/billController.js";



const router = express.Router();


router.post("/",verifyToken,allowRoles("admin"),createBill);

router.get("/",verifyToken,allowRoles("admin"),getBills);

router.get("/my",verifyToken,allowRoles("resident"),getMyBill);

router.put("/pay/:id",verifyToken,allowRoles("resident"),payBill);


export default router;