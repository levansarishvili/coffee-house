import React from "react";
import LoginForm from "./LoginForm";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl font-semibold">{t("header")}</h1>

      <LoginForm />
    </main>
  );
}
