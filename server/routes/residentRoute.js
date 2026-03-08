import express from "express";
import { createResident, getResident, updateResident } from "../controllers/residentController.js";
import {  allowRoles, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",verifyToken,createResident);
router.get("/",verifyToken,allowRoles("admin"),getResident);
router.put("/",verifyToken,updateResident);


export default router;