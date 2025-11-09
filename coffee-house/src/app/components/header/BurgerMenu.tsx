"use client";

import { useEffect } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BurgerMenu({ isOpen, setIsOpen }: BurgerMenuProps) {
  function handleBurgerMenuToggle() {
    setIsOpen((prev) => !prev);
  }

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <button
      onClick={handleBurgerMenuToggle}
      className="burger-menu lg:hidden flex flex-col gap-1.5 w-10 h-10 border border-[#665f55] rounded-full justify-center items-center 
      cursor-pointer hover:bg-[#665f55] group transition-all duration-300"
    >
      <span
        className={`${
          isOpen ? "rotate-45 translate-y-2" : "rotate-0"
        } bg-primary group-hover:bg-[#e1d4c9] w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
      <span
        className={`${
          isOpen ? "opacity-0" : "opacity-100"
        } bg-primary group-hover:bg-[#e1d4c9] w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
      <span
        className={`${
          isOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
        } bg-primary group-hover:bg-[#e1d4c9] w-4 h-0.5 rounded-4xl transition-all duration-300`}
      ></span>
    </button>
  );
}
