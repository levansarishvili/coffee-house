import { CartItemType } from "@/app/types/interfaces";

export const addToCart = async (cartItemData: CartItemType) => {
  try {
    const response = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItemData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || "Add to cart failed");
    }

    return result;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};
