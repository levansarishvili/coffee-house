"use client";

import { useCart } from "@/app/context/useCart";
import { ShoppingBagIcon } from "@/utils/CustomIcons";
import Link from "next/link";

interface CartLinkProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartLink({ setIsOpen }: CartLinkProps) {
  const { cartItemsQuantity } = useCart();

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <Link
      href="/cart"
      className="flex items-center justify-center order-2 lg:order-1 gap-2 hover:text-primary transition-all duration-400 relative group"
      onClick={handleClick}
    >
      <ShoppingBagIcon className="w-10 h-10 lg:w-6 lg:h-6" />
      <span className="absolute -top-4 -right-4 flex justify-center items-center bg-[#665f55] rounded-full text-xs text-[#e1d4c9] w-5.5 h-5.5 cart-items-quantity">
        {cartItemsQuantity}
      </span>

      <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-primary scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
    </Link>
  );
}
