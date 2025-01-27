import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authenticateToken";

const prisma = new PrismaClient();

export const postResult = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.userId;
        const { score, quizName } = req.body;
        const result = await prisma.result.create({
            data: {
                userId,
                score,
                quizName,
            },
        });

        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
};
