"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import { ModeToggle } from "../ModeToggle";
import LanguageToggle from "../LanguageToggle";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/useAuth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, loading } = useAuth();

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  }

  return (
    <header className="w-full sticky bg-background top-0 z-100 shadow-md">
      <div className="flew w-full max-w-xl mx-auto text-primary px-4 sm:px-10 py-5 flex justify-between items-center h-20">
        <Logo isOpen={isOpen} setIsOpen={setIsOpen} />

        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <ModeToggle />
            <LanguageToggle />
          </div>
          <Avatar
            isAuthenticated={isAuthenticated}
            avatar_url={userProfile?.avatar_url}
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
}
