"use client";

import { useCart } from "@/app/context/useCart";
import CartItem from "./CartItem";
import Loading from "@/Loading";
import { useAuth } from "@/app/context/useAuth";
import { useEffect, useState } from "react";
import { confirmOrder } from "@/utils/confirmOrder";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

export default function CartContent() {
  const { cartItems, loading, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const hasAddress =
    userProfile?.city && userProfile?.street && userProfile?.house_number;

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  }

  const finalTotalPrice =
    isAuthenticated && totalDiscountedPrice < totalPrice
      ? totalDiscountedPrice
      : totalPrice;

  // Calculate total price and discounted price
  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0);
    const totalDiscountedPrice = cartItems.reduce((total, item) => {
      return (total += item.discount_price * item.quantity);
    }, 0);

    setTotalPrice(totalPrice);
    setTotalDiscountedPrice(totalDiscountedPrice);
  }, [cartItems]);

  // Confirm order
  async function handleConfirmOrder() {
    if (user) {
      const orderData = { user_id: user.id, total_price: finalTotalPrice };

      const orderItemsData = cartItems.map((item) => ({
        user_id: user.id,
        product_id: item.product_id as number,
        product_name: item.name,
        total_price: item.discount_price
          ? item.discount_price * item.quantity
          : item.price * item.quantity,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      }));

      try {
        setIsLoading(true);

        await confirmOrder(orderData, orderItemsData);
        // Clear cart after successful confirmation
        clearCart();
        toast.success("Order placed successfully!");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col gap-10 w-full">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id as number}
          isAuthenticated={isAuthenticated}
        />
      ))}

      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex w-full justify-between">
          <span className="font-semibold text-lg md:text-2xl">Total:</span>

          {/* Price Section */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4">
            {isAuthenticated && totalPrice > totalDiscountedPrice ? (
              <>
                <span className="text-lg md:text-2xl font-semibold opacity-50 line-through">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="text-lg md:text-2xl font-semibold">
                  ${totalDiscountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg md:text-2xl font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {hasAddress && (
          <div className="flex w-full justify-between">
            <span className="font-semibold text-lg md:text-2xl">Address:</span>
            <span className="font-semibold text-lg md:text-2xl">
              {userProfile.city
                ? userProfile.city.charAt(0).toUpperCase() +
                  userProfile.city.slice(1)
                : ""}
              , {userProfile.street}, {userProfile.house_number}
            </span>
          </div>
        )}
      </div>

      {isAuthenticated ? (
        <div className="flex justify-center mt-8 w-full">
          {cartItems.length > 0 && (
            <button
              disabled={isLoading ? true : false}
              onClick={handleConfirmOrder}
              className="flex gap-4 justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Placing Order...
                </>
              ) : (
                <>Confirm Order</>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col md:flex-row gap-8 mt-8 w-full">
          <Link
            href="/login"
            className="flex justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 py-2.5 px-[78px] rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="flex justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 py-2.5 px-[78px] rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
          >
            Register
          </Link>
        </div>
      )}
    </section>
  );
}
