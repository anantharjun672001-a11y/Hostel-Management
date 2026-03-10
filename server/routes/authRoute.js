import express from "express";
import { getResidentUsers, login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/residents", verifyToken, getResidentUsers);

export default router;