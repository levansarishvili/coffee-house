"use client";

import { createClient } from "@/utils/supabase/component";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { CartItemType } from "../types/interfaces";

interface CartContextType {
  cartItems: CartItemType[];
  cartItemsQuantity: number;
  loading: boolean;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate cart items quantity
  useEffect(() => {
    const quantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemsQuantity(quantity);
  }, [cartItems]);

  // Fetch user and cart data
  useEffect(() => {
    const fetchUserAndCart = async () => {
      setLoading(true);

      // 🔹 Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      let data, error;

      if (user) {
        ({ data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id));
      } else {
        ({ data, error } = await supabase.from("temporary_cart").select("*"));
      }

      if (!error && data) {
        setCartItems(data);
      } else {
        console.error("Error loading cart:", error);
      }

      setLoading(false);
    };

    fetchUserAndCart();
  }, [supabase]);

  const refreshCart = useCallback(async () => {
    try {
      let data = null;
      let error = null;

      // Wait for Supabase user check
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        ({ data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id));
      } else {
        ({ data, error } = await supabase.from("temporary_cart").select("*"));
      }

      if (error) {
        console.error("Error refreshing cart:", error);
        return;
      }

      if (data) {
        setCartItems(data);
      }
    } catch (err) {
      console.error("Unexpected error refreshing cart:", err);
    }
  }, [supabase]);

  // Update cart items quantity
  const updateQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      // Store the previous state for rollback
      const previousCartItems = [...cartItems];

      // Update the UI immediately (optimistic update)
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );

      try {
        // Update database in background
        const table = user ? "cart_items" : "temporary_cart";

        let query = supabase
          .from(table)
          .update({ quantity, updated_at: new Date().toISOString() })
          .eq("id", itemId);

        if (user) {
          query = query.eq("user_id", user.id);
        }

        const { error } = await query;
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Failed to update quantity:", error);
        setCartItems(previousCartItems);
        await refreshCart();
      }
    },
    [user, refreshCart, cartItems, supabase]
  );

  // Remove cart item from cart with optimistic UI update
  const removeFromCart = useCallback(
    async (itemId: number) => {
      // Store the previous state for rollback
      const previousCartItems = [...cartItems];

      // Update the UI immediately
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));

      try {
        // Update database in background
        const table = user ? "cart_items" : "temporary_cart";

        let query = supabase.from(table).delete().eq("id", itemId);

        if (user) {
          query = query.eq("user_id", user.id);
        }

        const { error } = await query;
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        setCartItems(previousCartItems);
        await refreshCart();
      }
    },
    [user, refreshCart, cartItems, supabase]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    const table = user ? "cart_items" : "temporary_cart";
    if (user) {
      await supabase.from(table).delete().eq("user_id", user.id);
    } else {
      await supabase.from(table).delete();
    }
    setCartItems([]);
  }, [user, supabase]);

  const value: CartContextType = {
    cartItems,
    cartItemsQuantity,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {" "}
      {mounted ? children : null}
    </CartContext.Provider>
  );
};
