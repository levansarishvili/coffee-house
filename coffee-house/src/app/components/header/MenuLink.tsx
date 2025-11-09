import { CoffeeIcon } from "@/utils/CustomIcons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface MenuLinkProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuLink({ setIsOpen }: MenuLinkProps) {
  const t = useTranslations("Navigation");

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <Link
      href="/menu"
      className="flex items-center order-1 lg:order-2 gap-2 hover:text-primary transition-all duration-400 relative group"
      onClick={handleClick}
    >
      <span>{t("menu")}</span>
      <CoffeeIcon className="w-10 h-10 lg:w-5 lg:h-5" />
      <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
    </Link>
  );
}
