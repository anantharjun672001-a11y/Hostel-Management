import express from "express";
import { allowRoles, verifyToken } from "../middleware/authMiddleware.js";
import { createMaintenance, getMaintenance, updateStatus } from "../controllers/maintenanceController.js";


const router = express.Router();

router.post("/",verifyToken,createMaintenance);
router.get("/",verifyToken,allowRoles("admin","staff"),getMaintenance);
router.put("/:id",verifyToken,allowRoles("admin","staff"),updateStatus);


export default router;