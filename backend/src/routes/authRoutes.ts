import { login, register } from "../controllers/authController";
import express from "express";
import {
  AuthenticatedRequest,
  authenticateToken,
} from "../middlewares/authenticateToken";
import { Response } from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// TODO 認証するものをどんどん書いていく
router.get(
  "/protected",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "認証されたルートです", user: req.user });
  }
);

export default router;
