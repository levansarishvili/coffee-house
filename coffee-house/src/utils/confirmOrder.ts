import { OrderDataType, OrderItemsDataType } from "@/app/types/interfaces";

export async function confirmOrder(
  orderData: OrderDataType,
  orderItemsData: OrderItemsDataType[]
) {
  try {
    const res = await fetch("/api/confirm-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderData, orderItemsData }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to place order");

    console.log("Order placed successfully!", data);
  } catch (error) {
    console.error("Error confirming order:", error);
  }
}
