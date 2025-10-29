import React from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full py-4 font-semibold">
      {/* Left: Logo */}
      <div>
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            width={100}
            height={60}
            alt="Coffee House logo"
          />
        </Link>
      </div>

      {/* Center: Nav links */}
      <ul className="flex items-center gap-10">
        <li>
          <Link
            href="#slider"
            className="hover:text-primary transition-all duration-400 relative group"
          >
            Favorite coffee
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link
            href="#about"
            className="hover:text-primary transition-all duration-400 relative group"
          >
            About
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link
            href="#mobile-app"
            className="hover:text-primary transition-all duration-400 relative group"
          >
            Mobile app
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link
            href="#footer"
            className="hover:text-primary transition-all duration-400 relative group"
          >
            Contact us
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </li>
      </ul>

      {/* Right: Cart + Menu */}
      <div className="flex items-center gap-6">
        <Link
          href="/cart"
          className="flex items-center gap-2 hover:text-primary transition-all duration-400 relative group"
        >
          <ShoppingBagIcon className="w-5 h-5 stroke-1.5 text-primary" />
          <span className="cart-items-quantity">12</span>

          <div className="header-prices-wrapper flex gap-1.5 text-xs font-medium absolute bottom-6">
            <span
              className="original-price--header line-through opacity-50 ${
          isAuthenticated && totalPrice !== finalPrice ? '' : 'display-none'
        }"
            >
              {/* $${totalPrice.toFixed(2)} */}22.00
            </span>
            <span
              className="total-price--header ${
          isAuthenticated && finalPrice > 0 ? '' : 'display-none'
        }"
            >
              {/* $${finalPrice.toFixed(2)} */}12.05
            </span>
          </div>
          <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
        </Link>

        <Link
          href="/menu"
          className="flex items-center gap-2 hover:text-primary transition-all duration-400 relative group"
        >
          <span>Menu</span>
          <Image
            src="/assets/coffee-cup.svg"
            width={20}
            height={20}
            alt="Coffee cup icon"
          />
          <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
        </Link>
      </div>
    </nav>
  );
}
