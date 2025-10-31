import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/utils/CustomIcons";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer
      className="flex flex-col lg:flex-row gap-15 lg:gap-[100px] mt-[100px] items-start lg:items-center px-4 py-15 sm:px-15 sm:py-[100px] lg:p-[100px] w-full rounded-[40px] overflow-hidden text-[#E1D4C9] bg-[#665f55]"
      id="contact"
    >
      <div className="flex flex-col gap-10 w-full lg:w-1/2">
        <h2 className="text-3xl md:text-[56px] font-semibold">
          {t("headerPart-1")}
          <span className="text-accent italic"> {t("headerPart-2")}</span>
        </h2>
        <div className="flex gap-3">
          <Link
            className="flex justify-center items-center rounded-full border border-[#E1D4C9] w-15 h-15 group hover:bg-[#E1D4C9] hover:text-[#403f3d] transition-all duration-300"
            href="https://twitter.com/"
            target="_blank"
          >
            <TwitterIcon size={24} className="" />
          </Link>
          <Link
            className="flex justify-center items-center rounded-full border border-[#E1D4C9] w-15 h-15 group hover:bg-[#E1D4C9] hover:text-[#403f3d] transition-all duration-300"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <InstagramIcon size={24} />
          </Link>
          <Link
            className="flex justify-center items-center rounded-full border border-[#E1D4C9] w-15 h-15 group hover:bg-[#E1D4C9] hover:text-[#403f3d] transition-all duration-300"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <FacebookIcon size={24} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h3 className="font-semibold text-2xl">{t("contact")}</h3>
        <div className="flex flex-col gap-3">
          <Link
            className="flex items-center gap-1 relative group"
            href="https://www.google.ge/maps/@41.724172,44.7370823,17z?entry=ttu"
            target="_blank"
          >
            <MapPinIcon className="w-5 h-5 stroke-[1.5]" />
            <p className="font-semibold">8558 Green Rd., LA</p>
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-[#E1D4C9] scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>

          <Link
            className="flex items-center gap-1 relative group"
            href="tel:+16035550123"
          >
            <PhoneIcon className="w-5 h-5 stroke-[1.5]" />
            <p className="font-semibold">+1 (603) 555-0123</p>
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-[#E1D4C9] scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5 stroke-[1.5]" />
            <p className="font-semibold">{t("workDays")} 9:00 AM – 23:00 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
