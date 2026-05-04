"use client";

import { THEMES } from "@/app/constants/constants";
import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

interface LogoProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Logo({ isOpen, setIsOpen }: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle burger menu close if it is open
  function handleBurgerMenuClose() {
    if (isOpen) setIsOpen(false);
  }

  if (!mounted) {
    return (
      <div>
        <Link href="/">
          <div className="overflow-hidden w-20 h-12 md:w-25 md:h-15">
            <Image
              src={`/assets/logo.svg`}
              width={100}
              height={60}
              alt="Coffee House logo"
            />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/" onClick={handleBurgerMenuClose}>
        <div className="overflow-hidden w-20 h-12 md:w-25 md:h-15">
          <Image
            src={`/assets/logo${theme === THEMES.DARK ? "-dark" : ""}.svg`}
            width={100}
            height={60}
            alt="Coffee House logo"
          />
        </div>
      </Link>
    </div>
  );
}
