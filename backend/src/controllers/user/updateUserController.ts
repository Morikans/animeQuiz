import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authenticateToken";

const prisma = new PrismaClient();

export const updateUser = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.userId;
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: "名前は必須です" });
            return;
        }
        /// Prismaを使ってユーザー情報を更新
        const updatedUser = await prisma.user.update({
            where: {
                id: userId, // 更新するユーザーIDを指定
            },
            data: {
                name, // 新しい名前
            },
        });

        // 更新されたユーザー情報をレスポンスとして返す
        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
};
