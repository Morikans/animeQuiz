"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt");
// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // リクエストヘッダーのauthorizationを取ってくる
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]; // Bearer <トークン>が取れるので、splitで[Bearer, <トークン>]として、トークンのみを取得する。
    if (!token) {
        res.status(401).json({ error: "トークンが存在しません" });
        return;
    }
    const user = (0, jwt_1.verifyJWT)(token);
    if (!user) {
        res.status(403).json({ error: "トークンが無効です" });
        return;
    }
    req.user = user;
    next();
};
exports.authenticateToken = authenticateToken;
