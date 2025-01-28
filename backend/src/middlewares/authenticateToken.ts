import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

// TODO 型をもっと厳格に
export interface AuthenticatedRequest extends Request {
    user?: any;
}

// 認証ミドルウェア
export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.accessToken; // クッキーからアクセストークンを取ってくる
    if (!token) {
        res.status(401).json({
            error: "アクセストークンがcookieに存在しません",
        });
        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "トークンが無効です" });
        }
        req.user = user; // トークンのデコード結果をリクエストオブジェクトに追加
        next();
    });
};
