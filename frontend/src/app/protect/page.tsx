"use client";
import { Button } from "@/components/common/button";

const Login = () => {
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/protected", {
        method: "GET",
        credentials: "include", // クッキーを送信するために必要,
        headers: {
          Authorization: "Bearer <your-token-here>", // Authorizationヘッダーを追加
        },
      });
      console.log(res);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Button text="トークン認証" />
      </form>
    </div>
  );
};

export default Login;
