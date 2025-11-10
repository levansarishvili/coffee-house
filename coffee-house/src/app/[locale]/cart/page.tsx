import { useTranslations } from "next-intl";
import CartContent from "./CartContent";

export default function CartPage() {
  const t = useTranslations("CartPage");
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[32px] md:text-6xl text-center max-w-[860px] font-semibold leading-[120%]">
        {t("header")}
      </h1>

      <CartContent />
    </main>
  );
}
