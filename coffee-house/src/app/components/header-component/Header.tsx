import Image from "next/image";
import React from "react";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-15 mb-5">
      <Navigation />

      <a
        className="burger-menu display-none flex justify-center align-center cursor-pointer"
        href="#"
      >
        {/* <!-- Burger menu Line --> */}
        <div className="burger-lines flex-col gap-8" id="burger-line">
          <span className="top-line"></span>
          <span className="bottom-line"></span>
        </div>
      </a>
    </header>
  );
}
