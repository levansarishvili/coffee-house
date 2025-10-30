"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isPending, startTransition] = React.useTransition();

  const nextTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

  function handleModeToggle() {
    startTransition(() => {
      setTheme(nextTheme);
    });
  }

  return (
    <>
      <button
        onClick={handleModeToggle}
        className={`
    relative w-14.5 h-7 bg-button-hover cursor-pointer rounded-full
    overflow-hidden transition-all duration-300
    shadow-md hover:shadow-lg
    ${isPending && "opacity-70"}
  `}
        disabled={isPending}
      >
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />

        <span
          className={`
      absolute top-1/2 -translate-y-1/2 left-0.5 w-6 h-6 flex items-center justify-center 
      rounded-full transition-all duration-300 ease-out ${
        theme === THEMES.DARK
          ? "opacity-50"
          : "bg-inverse text-primary shadow opacity-100"
      }
    `}
        >
          <SunIcon className="w-4" />
        </span>

        <span
          className={`
      absolute top-1/2 -translate-y-1/2 right-0.5 w-6 h-6
      rounded-full transition-all duration-300 ease-out text-xs flex items-center justify-center ${
        theme === THEMES.DARK
          ? "bg-inverse text-primary shadow opacity-100"
          : "opacity-50"
      }
    `}
        >
          <MoonIcon className="w-4" />
        </span>
      </button>
    </>
  );
}
