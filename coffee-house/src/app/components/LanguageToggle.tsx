"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentLang, setCurrentLang] = useState("en"); // Default to 'en'
  const [isPending, startTransition] = useTransition();

  const nextLang = currentLang === "en" ? "ka" : "en";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    // Extract language from current pathname
    const pathLang = pathname.split("/")[1];
    const validLangs = ["en", "ka"];
    const detectedLang = validLangs.includes(pathLang) ? pathLang : "en";

    const finalLang =
      savedLanguage && validLangs.includes(savedLanguage)
        ? savedLanguage
        : detectedLang;

    setCurrentLang(finalLang);

    // Ensure localStorage is in sync
    if (!savedLanguage || savedLanguage !== finalLang) {
      localStorage.setItem("language", finalLang);
    }
  }, [pathname]);

  // Function to handle language change
  const handleToggle = () => {
    const newLang = nextLang;

    localStorage.setItem("language", newLang);

    startTransition(() => {
      // Create the new path by replacing the language segment
      const segments = pathname.split("/");
      if (segments[1] === currentLang) {
        segments[1] = newLang;
      } else {
        segments.splice(1, 0, newLang);
      }

      const newPath = segments.join("/");

      // Preserve query parameters
      const queryString = searchParams.toString();
      const fullPath = queryString ? `${newPath}?${queryString}` : newPath;

      router.push(fullPath);

      setCurrentLang(newLang);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`
    relative cursor-pointer transition-all duration-300
    ${isPending ? "opacity-70" : ""}
  `}
    >
      {/*cMobile view */}
      <span className="flex md:hidden text-sm items-center justify-center w-8 h-8 rounded-full hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300 font-semibold">
        {currentLang === "en" ? (
          <span className="flex items-center gap-1">KA</span>
        ) : (
          <span className="flex items-center gap-1">EN</span>
        )}
      </span>

      {/* Desktop view (full toggle) */}
      <div
        className={`
      hidden md:block relative w-14.5 h-7 bg-button-hover rounded-full overflow-hidden 
      shadow-md hover:shadow-lg transition-all duration-300
    `}
      >
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />

        {/* 🇬🇪 KA flag */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 
      rounded-full bg-cover bg-center shadow-md transition-all duration-300 ease-out
      ${
        currentLang === "en"
          ? "bg-[url('/assets/ka-flag.png')] left-0.5"
          : "bg-[url('/assets/en-flag.png')] left-full -translate-x-6.5"
      }
    `}
        />

        {/* Text indicator */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6
      rounded-full transition-all duration-300 ease-out text-xs flex items-center justify-center
      bg-cover bg-center
      ${currentLang === "en" ? "left-full -translate-x-6.5" : "left-0.5"}
    `}
        >
          {currentLang === "en" ? "KA" : "EN"}
        </span>
      </div>
    </button>
  );
}
