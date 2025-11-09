"use server";

import { createClient } from "@/utils/supabase/api";

export const migrateTemporaryCartToUserCart = async (
  userId: string
): Promise<void> => {
  const supabase = await createClient();

  try {
    // Fetch all items from temporary_cart
    const { data: tempCartItems, error: fetchError } = await supabase
      .from("temporary_cart")
      .select("*");

    if (fetchError) throw fetchError;

    // If no items in temporary cart, return
    if (!tempCartItems || tempCartItems.length === 0) return;

    // Insert items into user's cart
    const cartItems = tempCartItems.map((item) => ({
      user_id: userId,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
      name: item.name,
      additives: item.additives,
      price: item.price,
      discount_price: item.discount_price,
      image_url: item.image_url,
      updated_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase
      .from("cart_items")
      .insert(cartItems);

    if (insertError) throw insertError;

    // Delete temporary cart items after successful migration
    const { error: deleteError } = await supabase
      .from("temporary_cart")
      .delete()
      .gte("created_at", "1970-01-01");

    if (deleteError) throw deleteError;
  } catch (error) {
    console.error("Error migrating cart data:", error);
    throw error;
  }
};
