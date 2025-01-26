import { login, register, getUserData, updateUserData } from "../controllers";
import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// TODO 認証するものをどんどん書いていく
router.get("/getUserData", authenticateToken, getUserData);
router.get("/getUserData", authenticateToken, getUserData);
router.patch("/updateUserData", authenticateToken, updateUserData);

export default router;
