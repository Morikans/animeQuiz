"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.storeJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// JWTの生成
const generateJWT = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};
exports.generateJWT = generateJWT;
//JWTをCookieに保存
const storeJWT = (res, token) => {
    res.cookie("jwt", token, {
        httpOnly: true, // JavaScript からアクセス不可
        path: "http://localhost:3000",
        // secure: process.env.NODE_ENV === "production", // HTTPS 通信時のみ
        // sameSite: "strict", // CSRF 対策
        sameSite: "lax", // Cross-origin 許可
        secure: false, // HTTPS が不要な場合は false に
    });
};
exports.storeJWT = storeJWT;
// JWTの検証
// TODO ここの返り値の型をanyじゃなくしたい
const verifyJWT = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (err) {
        return null;
    }
};
exports.verifyJWT = verifyJWT;
