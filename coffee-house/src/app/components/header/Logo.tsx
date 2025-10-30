"use client";

import { THEMES } from "@/app/constants/constants";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render nothing or fallback during SSR
    return (
      <div>
        <Link href="/">
          <Image
            src={`/assets/logo.svg`}
            width={100}
            height={60}
            alt="Coffee House logo"
          />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <Image
          src={`/assets/logo${theme === THEMES.DARK ? "-dark" : ""}.svg`}
          width={100}
          height={60}
          alt="Coffee House logo"
        />
      </Link>
    </div>
  );
}
