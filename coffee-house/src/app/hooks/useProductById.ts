import { useEffect, useState } from "react";
import { ProductDetails } from "../types/interfaces";
import { supabase } from "@/lib/supabaseClient";

function useProductById(id: string) {
  const [product, setProduct] = useState<ProductDetails>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select(
            `
      *,
      product_sizes (*),
      product_additives (*)
    `
          )
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error:", error);
          setError(error.message);
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return { product, loading, error };
}

export default useProductById;
