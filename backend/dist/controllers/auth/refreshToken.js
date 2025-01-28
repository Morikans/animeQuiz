"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../utils/jwt");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const prisma = new client_1.PrismaClient();
// トークンリフレッシュ処理
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({
            message: "リフレッシュトークンがcookieにありません",
        });
        return;
    }
    try {
        // リフレッシュトークンを検証
        const decodedCookieRefreshToken = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // DBに保存されたリフレッシュトークンを確認(一致チェック)
        const storedRefreshToken = yield prisma.refreshToken.findFirst({
            where: {
                token: refreshToken,
                userId: decodedCookieRefreshToken.id,
            },
        });
        if (!storedRefreshToken) {
            res.status(403).json({
                message: "一致するリフレッシュトークンがDBにありません",
            });
            return;
        }
        // リフレッシュトークンの有効期限確認
        if (new Date(storedRefreshToken.expiresAt) < new Date()) {
            res.status(403).json({
                message: "リフレッシュトークンの有効期限切れです",
            });
            return;
        }
        // 新しいトークンを発行
        const user = yield prisma.user.findUnique({
            where: { id: decodedCookieRefreshToken.id },
        });
        const newAccessToken = (0, jwt_1.generateAccessToken)(user);
        const newRefreshToken = (0, jwt_1.generateRefreshToken)(user);
        // 古いトークンを削除して新しいトークンを保存
        yield prisma.refreshToken.delete({
            where: { id: storedRefreshToken.id },
        });
        // 有効期限もDBに入れておく
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7日後
        yield prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: user.id,
                expiresAt,
            },
        });
        // 新しいトークンをクッキーに保存
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.json({ message: "トークンのリフレッシュが完了しました！！" });
    }
    catch (error) {
        res.status(403).json({ message: "無効なリフレッシュトークンです" });
    }
});
exports.refreshToken = refreshToken;
