import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/api";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const cartItemData = await request.json();
    const {
      product_id,
      quantity,
      size,
      additives,
      price,
      name,
      discount_price,
      image_url,
    } = cartItemData;

    // Check if product is already exist in the cart with same size and additives
    const { data: existingItems, error: checkError } = await supabase
      .from("temporary_cart")
      .select("*")
      .eq("product_id", product_id)
      .eq("size", size);

    if (checkError) {
      console.error("Check error:", checkError);
    }

    // Manual array comparison in JavaScript
    const existingItem = existingItems?.find(
      (item) =>
        Array.isArray(item.additives) &&
        Array.isArray(additives) &&
        item.additives.length === additives.length &&
        item.additives.every(
          (additive: string, index: number) => additive === additives[index]
        )
    );

    let result;

    if (existingItem && !checkError) {
      // Item exists - update quantity
      const { data: updatedItem, error: updateError } = await supabase
        .from("temporary_cart")
        .update({
          quantity: existingItem.quantity + quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 400 }
        );
      }

      result = updatedItem;

      return NextResponse.json({
        success: true,
        data: result,
        action: "updated",
      });
    } else {
      // Item doesn't exist - insert new item
      const { data: newItem, error: insertError } = await supabase
        .from("temporary_cart")
        .insert({
          product_id,
          quantity,
          size,
          additives,
          price,
          name,
          discount_price,
          image_url,
        })
        .select()
        .single();

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 400 }
        );
      }

      result = newItem;

      return NextResponse.json({
        success: true,
        data: result,
        action: "added",
      });
    }
  } catch (error) {
    console.log("Cart API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
