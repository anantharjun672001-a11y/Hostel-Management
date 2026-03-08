import express from "express";
import { createResident, getMyRoom, getResident, updateResident } from "../controllers/residentController.js";
import {  allowRoles, verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/",verifyToken,createResident);
router.get("/",verifyToken,allowRoles("admin"),getResident);
router.put("/",verifyToken,updateResident);
router.get("/my-room", verifyToken, getMyRoom);



export default router;