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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../../utils/jwt");
const prisma = new client_1.PrismaClient();
// ログイン
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // ユーザー認証
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ error: "メールアドレスが違います" });
            return;
        }
        // パスワード認証
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "パスワードが違います" });
            return;
        }
        // トークン生成
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        // リフレッシュトークンをDBに保存
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7日後
        yield prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt,
            },
        });
        // クッキーに保存
        res.cookie("accessToken", accessToken, {
            httpOnly: true, // JavaScript からアクセス不可
            secure: false, // HTTPS が不要な場合は false に
            sameSite: "lax", // Cross-origin 許可
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // JavaScript からアクセス不可
            secure: false, // HTTPS が不要な場合は false に
            sameSite: "lax", // Cross-origin 許可
        });
        res.json({ message: "ログインに成功しました" });
    }
    catch (error) {
        console.error("エラーの詳細:", error);
        res.status(500).json({ error: "サーバーエラーです。" });
    }
});
exports.login = login;
