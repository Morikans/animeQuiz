import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// JWTの生成
export const generateJWT = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
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