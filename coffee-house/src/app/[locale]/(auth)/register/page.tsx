import React from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl font-semibold">Registration</h1>

      <RegisterForm />
    </main>
  );
}
