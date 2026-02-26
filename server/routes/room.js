import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { assignRoom, createRoom, getRooms, vacateRoom } from "../controllers/roomController";


const router = express.Router();

router.post("/",verifyToken,createRoom);
router.get("/",verifyToken,getRooms);
router.post("/",verifyToken,assignRoom);
router.post("/",verifyToken,vacateRoom);


export default router;