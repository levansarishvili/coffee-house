"use client";

import { useCart } from "@/app/context/useCart";
import CartItem from "./CartItem";
import Loading from "@/Loading";
import { useAuth } from "@/app/context/useAuth";

export default function CartItems() {
  const { cartItems, loading } = useCart();
  const { user } = useAuth();

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  }

  return (
    <section className="flex flex-col gap-5 w-full">
      {loading ? (
        <Loading />
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id as number}
            isAuthenticated={isAuthenticated}
          />
        ))
      )}
    </section>
  );
}
