"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
router.get("/getUser", authenticateToken_1.authenticateToken, controllers_1.getUser);
router.patch("/updateUser", authenticateToken_1.authenticateToken, controllers_1.updateUser);
exports.default = router;
