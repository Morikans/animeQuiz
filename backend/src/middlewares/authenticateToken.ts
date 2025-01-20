import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

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
  const authHeader = req.headers.authorization; // リクエストヘッダーのauthorizationを取ってくる
  const token = authHeader?.split(" ")[1]; // Bearer <トークン>が取れるので、splitで[Bearer, <トークン>]として、トークンのみを取得する。

  if (!token) {
    res.status(401).json({ error: "トークンが存在しません" });
    return;
  }

  const user = verifyJWT(token);
  if (!user) {
    res.status(403).json({ error: "トークンが無効です" });
    return
  }

  req.user = user;
  next();
};
