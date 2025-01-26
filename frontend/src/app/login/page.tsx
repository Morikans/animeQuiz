"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON データを送ることを指定
        },
        credentials: "include", // 必須：クッキーを送受信
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleSubmit2 = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/protected", {
        method: "GET",
        credentials: "include", // クッキーを送信するために必要,
      });
      console.log(res);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Input
          labelName="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          labelName="パスワード"
          marginTop
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="ログイン" />
      </form>
      <form action="" onSubmit={handleSubmit2}>
        <Button text="トークン認証" />
      </form>
    </div>
  );
};

export default Login;
