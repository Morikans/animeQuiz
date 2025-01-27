"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
// 認証ミドルウェア
const refreshToken = (req, res, next) => {
    if (isTokenExpiring(req.user)) {
        const newToken = generateNewToken(req.user);
        res.setHeader("Authorization", `Bearer ${newToken}`);
    }
    next();
};
exports.refreshToken = refreshToken;
