import { useCart } from "@/app/context/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface CartItemProps {
  id: number;
  isAuthenticated: boolean;
}

export default function CartItem({ id, isAuthenticated }: CartItemProps) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === id);

  function handleRemoveFromCart() {
    removeFromCart(id);
  }

  function handleQuantityDecrease() {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(id, cartItem.quantity - 1);
    }
  }

  function handleQuantityIncrease() {
    if (cartItem) {
      updateQuantity(id, cartItem.quantity + 1);
    }
  }

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      {cartItem && (
        <>
          <button
            onClick={() => handleRemoveFromCart()}
            className="flex items-center justify-center cursor-pointer group w-5 h-5 md:w-6 md:h-6"
          >
            <TrashIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-accent transition-all duration-300" />
          </button>

          <div className="w-full max-w-20 max-h-20 md:max-w-24 md:max-h-24 overflow-hidden rounded-[20px]">
            <Image
              src={cartItem.image_url}
              alt={cartItem.name}
              width={200}
              height={200}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center w-full gap-4 sm:gap-6 p-3 border-b border-[#c1b6ad] dark:border-[#665f55]">
            {/* Product Info */}
            <div className="flex flex-col gap-1 ">
              <h3 className="text-lg md:text-2xl font-semibold">
                {cartItem.name}
              </h3>
              <span className="text-sm md:text-base opacity-80">
                {cartItem.size}
                {cartItem.additives?.length
                  ? `, ${cartItem.additives.join(", ")}`
                  : ""}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleQuantityDecrease()}
                className="flex justify-center items-center cursor-pointer hover:bg-[#665f55] 
      hover:text-[#e1d4c9] transition-all duration-300 rounded-full w-7 h-7 md:w-8 md:h-8"
              >
                <MinusIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              <span className="text-base md:text-lg font-medium">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => handleQuantityIncrease()}
                className="flex justify-center items-center cursor-pointer hover:bg-[#665f55] 
      hover:text-[#e1d4c9] transition-all duration-300 rounded-full w-7 h-7 md:w-8 md:h-8"
              >
                <PlusIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            {/* Price Section */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4">
              {isAuthenticated && cartItem.discount_price < cartItem.price ? (
                <>
                  <span className="text-lg md:text-2xl font-semibold opacity-50 line-through">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                  <span className="text-lg md:text-2xl font-semibold">
                    ${(cartItem.discount_price * cartItem.quantity).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg md:text-2xl font-semibold">
                  ${(cartItem.price * cartItem.quantity).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
