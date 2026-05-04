import { useTranslations } from "next-intl";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("RegistrationPage");

  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl font-semibold">{t("header")}</h1>

      <RegisterForm />
    </main>
  );
}
