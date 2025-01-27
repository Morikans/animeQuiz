import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes, resultRoutes, userDataRoutes } from "./routes";

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
app.use("/user", userDataRoutes);
app.use("/result", resultRoutes);

export default app;
