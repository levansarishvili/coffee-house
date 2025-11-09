import React from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl font-semibold">Sign In</h1>

      <LoginForm />
    </main>
  );
}
