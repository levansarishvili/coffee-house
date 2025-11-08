import { useEffect, useState } from "react";
import { OrderItemsDataType } from "../types/interfaces";
import { createClient } from "@/utils/supabase/component";

function useOrderById(id: number) {
  const [order, setOrder] = useState<OrderItemsDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Get the current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Auth error:", userError);
          setError(`Authentication error: ${userError.message}`);
          return;
        }

        setLoading(true);
        const { data, error } = await supabase
          .from("order_items")
          .select("*")
          .eq("user_id", user?.id)
          .eq("order_id", id);

        if (error) {
          console.error("Error:", error);
          setError(error.message);
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);
  return { order, loading, error };
}

export default useOrderById;
