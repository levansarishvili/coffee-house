"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import { ModeToggle } from "../ModeToggle";
import LanguageToggle from "../LanguageToggle";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center h-15 mb-5">
      <Logo />

      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex items-center gap-4">
        <ModeToggle />
        <LanguageToggle />
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
