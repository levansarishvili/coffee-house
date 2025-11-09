"use client";

import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useTransition } from "react";
import { THEMES } from "../constants/constants";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return;
  }

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
    relative cursor-pointer transition-all duration-300
    ${isPending ? "opacity-70" : ""}
  `}
        disabled={isPending}
      >
        {/* Mobile view (no toggle) */}
        <span
          className="flex md:hidden items-center justify-center w-8 h-8 rounded-full 
        hover:bg-[#665f55] group transition-all duration-300"
        >
          {theme === THEMES.DARK ? (
            <MoonIcon className="w-6 h-6 stroke-[1.5] group-hover:stroke-[#e1d4c9] transition-all duration-300" />
          ) : (
            <SunIcon className="w-6 h-6 stroke-[1.5] group-hover:stroke-[#e1d4c9] transition-all duration-300" />
          )}
        </span>

        <div
          className={`
      hidden md:block relative w-14.5 h-7 bg-button-hover rounded-full overflow-hidden 
      shadow-md hover:shadow-lg transition-all duration-300
    `}
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
            <SunIcon className="w-4.5 h-4.5 stroke-1.5" />
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
            <MoonIcon className="w-4.5 h-4.5 stroke-1.5" />
          </span>
        </div>
      </button>
    </>
  );
}
