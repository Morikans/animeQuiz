"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
router.post("/register", controllers_1.register);
router.post("/login", controllers_1.login);
// TODO 認証するものをどんどん書いていく
router.get("/protected", authenticateToken_1.authenticateToken, (req, res) => {
    res.json({ message: "認証されたルートです", user: req.user });
});
router.get("/getUserData", authenticateToken_1.authenticateToken, controllers_1.getUserData);
exports.default = router;
