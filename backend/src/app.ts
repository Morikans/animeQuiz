import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const corsOptions = {
    origin: "http://localhost:3000", // 許可するオリジンを指定
    credentials: true, // クッキーや認証情報を許可
};

const app = express();
// cookieから直接データを取ってくるために必要なミドルウェア(req.cookies.jwt)
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);

export default app;
