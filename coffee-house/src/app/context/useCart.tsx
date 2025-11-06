"use client";

import { createClient } from "@/utils/supabase/component";
import { createContext, useContext } from "react";

const CartContext = createContext(null);

// Hook to use the auth context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("usecart must be used within an CartProvider");
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // return <CartContext.Provider value={}>{children}</CartContext.Provider>;
};
