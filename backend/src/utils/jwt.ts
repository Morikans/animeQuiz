import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// アクセストークン生成
export const generateAccessToken = (user): string => {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m", // 有効期限:15分
    });
};

// リフレッシュトークン生成
export const generateRefreshToken = (user): string => {
    return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d", // 有効期限:7日
    });
};

// //JWTをCookieに保存
// export const storeJWT = (res: Response, token: string) => {
//     res.cookie("jwt", token, {
//         httpOnly: true, // JavaScript からアクセス不可
//         path: "http://localhost:3000",
//         // secure: process.env.NODE_ENV === "production", // HTTPS 通信時のみ
//         // sameSite: "strict", // CSRF 対策
//         sameSite: "lax", // Cross-origin 許可
//         secure: false, // HTTPS が不要な場合は false に
//     });
// };

// // JWTの検証
// // TODO ここの返り値の型をanyじゃなくしたい
// export const verifyJWT = (token: string): any | null => {
//     try {
//         return jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//         return null;
//     }
// };
