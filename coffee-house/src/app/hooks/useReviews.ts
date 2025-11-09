"use client";

import { useEffect, useState } from "react";
import { ReviewFormDataType } from "../types/interfaces";
import { createClient } from "@/utils/supabase/component";

function useReviews(product_id: number, refreshKey: number) {
  const [reviews, setReviews] = useState<ReviewFormDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("product_id", product_id)
          .order("id", { ascending: false });

        if (error) {
          console.error("Error:", error);
          setError(error.message);
          return;
        }

        setReviews(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product_id, refreshKey, supabase]);
  return { reviews, loading, error };
}

export default useReviews;
