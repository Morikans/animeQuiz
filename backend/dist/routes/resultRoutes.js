"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateToken_1 = require("../middlewares/authenticateToken");
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/postResult", authenticateToken_1.authenticateToken, controllers_1.postResult);
exports.default = router;
