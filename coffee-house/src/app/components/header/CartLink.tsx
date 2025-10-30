import { ShoppingBagIcon } from "@/utils/CustomIcons";
import Link from "next/link";

export default function CartLink() {
  return (
    <Link
      href="/cart"
      className="flex items-center order-2 lg:order-1 gap-2 hover:text-primary transition-all duration-400 relative group"
    >
      <ShoppingBagIcon className="w-10 h-10 lg:w-5 lg:h-5" />
      <span className="cart-items-quantity">12</span>

      <div className="header-prices-wrapper flex gap-1.5 text-sm lg:text-xs font-medium absolute bottom-10 lg:bottom-6">
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
  );
}
