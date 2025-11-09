"use client";

import { useEffect, useState } from "react";
import { OrderDataType } from "../types/interfaces";
import { createClient } from "@/utils/supabase/component";

function useOrders() {
  const [orders, setOrders] = useState<OrderDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
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

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user?.id);

        if (error) {
          console.error("Error:", error);
          setError(error.message);
          return;
        }

        setOrders(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [supabase]);
  return { orders, loading, error };
}

export default useOrders;
