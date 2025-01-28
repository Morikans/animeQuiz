"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// アクセストークン生成
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m", // 有効期限:15分
    });
};
exports.generateAccessToken = generateAccessToken;
// リフレッシュトークン生成
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d", // 有効期限:7日
    });
};
exports.generateRefreshToken = generateRefreshToken;
// //JWTをCookieに保存
// export const storeJWT = (res: Response, token: string) => {
//     res.cookie("jwt", token, {
//         httpOnly: true, // JavaScript からアクセス不可
//         path: "http://localhost:3000",
//         // secure: process.env.NODE_ENV === "production", // HTTPS 通信時のみ
//         // sameSite: "strict", // CSRF 対策
//         sameSite: "lax", // Cross-origin 許可
//         secure: false, // HTTPS が不要な場合は false に
//     });
// };
// // JWTの検証
// // TODO ここの返り値の型をanyじゃなくしたい
// export const verifyJWT = (token: string): any | null => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//         return null;
//     }
// };
