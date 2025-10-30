import { CoffeeIcon } from "@/utils/CustomIcons";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="rounded-[40px] py-15 px-4 md:p-[100px] overflow-hidden relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        id="enjoyVideo"
      >
        <source src="./assets/enjoy-video.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col gap-10 relative z-10 max-w-[540px] w-full">
        <h1 className="leading-[1.1] text-4xl md:text-[64px] tracking-[2] font-semibold text-[#e1d4c9]">
          <span className="text-accent italic">{t("enjoy")} </span>
          {t("header")}
        </h1>
        <p className="text-[#e1d4c9] font-normal text-base">{t("desc")}</p>
        <Link
          href="/menu"
          className="relative flex items-center font-semibold justify-center gap-4 text-[#403f3d] rounded-[100px] w-50 h-16 bg-[#e1d4c9] group overflow-hidden hover:pr-6 transition-all duration-300"
        >
          {t("menu")}
          <CoffeeIcon className="absolute right-15 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
}
