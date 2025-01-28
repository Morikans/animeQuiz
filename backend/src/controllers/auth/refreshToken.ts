import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const prisma = new PrismaClient();

// トークンリフレッシュ処理
export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({
            message: "リフレッシュトークンがcookieにありません",
        });
        return
    }

    try {
        // リフレッシュトークンを検証
        const decodedCookieRefreshToken = jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET
        ) as JwtPayload;
        // DBに保存されたリフレッシュトークンを確認(一致チェック)
        const storedRefreshToken = await prisma.refreshToken.findFirst({
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
        const user = await prisma.user.findUnique({
            where: { id: decodedCookieRefreshToken.id },
        });
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // 古いトークンを削除して新しいトークンを保存
        await prisma.refreshToken.delete({
            where: { id: storedRefreshToken.id },
        });
        // 有効期限もDBに入れておく
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7日後
        await prisma.refreshToken.create({
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
    } catch (error) {
        res.status(403).json({ message: "無効なリフレッシュトークンです" });
    }
};
