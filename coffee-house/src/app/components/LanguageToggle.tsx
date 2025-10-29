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

  // Sync with localStorage AND current URL on mount
  useEffect(() => {
    // First, check if there's a language in localStorage
    const savedLanguage = localStorage.getItem("language");

    // Extract language from current pathname (e.g., "/en/about" -> "en")
    const pathLang = pathname.split("/")[1];
    const validLangs = ["en", "ka"];
    const detectedLang = validLangs.includes(pathLang) ? pathLang : "en";

    // Priority: localStorage > URL > default 'en'
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

    // Update localStorage immediately
    localStorage.setItem("language", newLang);

    startTransition(() => {
      // Create the new path by replacing the language segment
      const segments = pathname.split("/");
      if (segments[1] === currentLang) {
        segments[1] = newLang;
      } else {
        // If current path doesn't have language prefix, add it
        segments.splice(1, 0, newLang);
      }

      const newPath = segments.join("/");

      // Preserve query parameters
      const queryString = searchParams.toString();
      const fullPath = queryString ? `${newPath}?${queryString}` : newPath;

      router.push(fullPath);

      // Update state after navigation
      setCurrentLang(newLang);
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`
    relative w-12 h-6 bg-inverse cursor-pointer rounded-full 
    overflow-hidden transition-all duration-300
    shadow-md hover:shadow-lg
    ${isPending && "opacity-70"}
  `}
      disabled={isPending}
    >
      {/* Darker inner shadow */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />

      <span
        className={`
      absolute top-1/2 -translate-y-1/2 w-5 h-5 
      rounded-full transition-all duration-300 ease-out
      bg-cover bg-center shadow-md
      ${
        currentLang === "en"
          ? "bg-[url('/assets/ka-flag.png')] left-0.5"
          : "bg-[url('/assets/en-flag.png')] left-full -translate-x-[21px]"
      }
    `}
      />
    </button>
  );
}
