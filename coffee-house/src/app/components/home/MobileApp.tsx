import { AppleIcon, GooglePlayIcon } from "@/utils/CustomIcons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function MobileApp() {
  const t = useTranslations("MobileApp");

  return (
    <section
      className="w-full flex flex-col lg:flex-row gap-10 md:gap-[100px] items-center"
      id="mobile"
    >
      <div className="flex flex-col gap-10 flex-1">
        <h2 className="text-3xl md:text-[56px] font-semibold leading-[120%]">
          <span className="text-accent italic">{t("headerPart-1")}</span>{" "}
          {t("headerPart-2")}
        </h2>
        <p className="text-base leading-[150%] font-normal">{t("desc")}</p>
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-5">
          <Link
            className="flex justify-center items-center gap-2 rounded-[100px] overflow-hidden w-[200px] h-16 border border-border-dark hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300"
            href="https://www.apple.com/app-store/"
            target="_blank"
          >
            <AppleIcon size={36} />
            <div className="">
              <p className="text-[10px] font-semibold">{t("available")}</p>
              <p className="font-semibold">App Store</p>
            </div>
          </Link>

          <Link
            className="flex justify-center items-center gap-2 rounded-[100px] overflow-hidden w-[200px] h-16 border border-border-dark hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300"
            href="https://play.google.com/store/games?device=windows&pli=1"
            target="_blank"
          >
            <GooglePlayIcon size={36} />
            <div className="">
              <p className="text-[10px] font-semibold">{t("available")}</p>
              <p className="font-semibold">Google Play</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <Image
          className="phone-img"
          width={600}
          height={600}
          src="/assets/mobile-screens.png"
          alt="mobile image"
        />
      </div>
    </section>
  );
}
