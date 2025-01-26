import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// JWTの生成
export const generateJWT = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

//JWTをCookieに保存
export const storeJWT = (res: Response, token: string) => {
  res.cookie("jwt", token, {
    httpOnly: true, // JavaScript からアクセス不可
    path: "http://localhost:3000",
    // secure: process.env.NODE_ENV === "production", // HTTPS 通信時のみ
    // sameSite: "strict", // CSRF 対策
    sameSite: "lax", // Cross-origin 許可
    secure: false, // HTTPS が不要な場合は false に
  });
};

// JWTの検証
// TODO ここの返り値の型をanyじゃなくしたい
export const verifyJWT = (token: string): any | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
