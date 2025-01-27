import { authenticateToken } from "../middlewares/authenticateToken";
import { postResult } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/postResult", authenticateToken, postResult);

export default router;
