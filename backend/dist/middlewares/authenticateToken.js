"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken; // クッキーからアクセストークンを取ってくる
    if (!token) {
        res.status(401).json({
            error: "アクセストークンがcookieに存在しません",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "トークンが無効です" });
        }
        req.user = user; // トークンのデコード結果をリクエストオブジェクトに追加
        next();
    });
};
exports.authenticateToken = authenticateToken;
