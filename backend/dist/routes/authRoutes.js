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
router.get("/getUserData", authenticateToken_1.authenticateToken, controllers_1.getUserData);
router.get("/getUserData", authenticateToken_1.authenticateToken, controllers_1.getUserData);
router.patch("/updateUserData", authenticateToken_1.authenticateToken, controllers_1.updateUserData);
exports.default = router;
