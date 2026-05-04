import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/api";
import { OrderItemsDataType } from "@/app/types/interfaces";

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const { orderData, orderItemsData } = body;

    // Get current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Create the order first
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_price: orderData.total_price,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Add order_id to each order item
    const itemsToInsert = orderItemsData.map((item: OrderItemsDataType) => ({
      ...item,
      order_id: order.id,
      user_id: user.id,
    }));

    // Insert order items
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
      return NextResponse.json(
        { error: "Failed to insert order items" },
        { status: 500 }
      );
    }

    // After successful purchase, update reviews for all products in this order
    // Get all unique product IDs from the order
    const productIds = [
      ...new Set(
        orderItemsData.map((item: OrderItemsDataType) => item.product_id)
      ),
    ];

    if (productIds.length > 0) {
      const { error: updateError } = await supabase
        .from("reviews")
        .update({ purchased_status: true })
        .eq("user_id", user.id)
        .in("product_id", productIds);

      if (updateError) {
        console.error("Error updating review purchase status:", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
