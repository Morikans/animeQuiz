import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authenticateToken";

const prisma = new PrismaClient();

export const getUser = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.id;
        // ユーザー情報をIDで取得
        const user = await prisma.user.findUnique({
            where: {
                id: userId, // IDで検索
            },
        });

        // ユーザーが見つからなかった場合の処理
        if (!user) {
            res.status(404).json({ error: "ユーザーが見つかりません" });
            return;
        }

        // ユーザー情報をレスポンスとして返す
        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
};
