import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

const prisma = new PrismaClient();

// ログイン
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // ユーザー認証
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ error: "メールアドレスが違います" });
            return;
        }
        // パスワード認証
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "パスワードが違います" });
            return;
        }

        // トークン生成
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // リフレッシュトークンをDBに保存
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7日後
        await prisma.refreshToken.create({
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
    } catch (error) {
        console.error("エラーの詳細:", error);
        res.status(500).json({ error: "サーバーエラーです。" });
    }
};
