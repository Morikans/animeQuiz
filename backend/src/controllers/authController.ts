import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateJWT, storeJWT } from "../utils/jwt";

const prisma = new PrismaClient();

// 新規登録
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "新規登録が完了しました！", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "ユーザーが既に存在するか、サーバーエラーです。" });
  }
};

// ログイン
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json({ error: "ユーザーが見つかりません" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "パスワードが違います" });
      return;
    }

    const token = generateJWT(user.id);
    storeJWT(res, token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラーです。" });
  }
};
