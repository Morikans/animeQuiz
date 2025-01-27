import { getUser, updateUser } from "../controllers";
import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/getUser", authenticateToken, getUser);
router.patch("/updateUser", authenticateToken, updateUser);

export default router;
