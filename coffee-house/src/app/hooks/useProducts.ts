import { useEffect, useState } from "react";
import { Product } from "../types/interfaces";
import { supabase } from "@/lib/supabaseClient";

function useProducts(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", category);

        if (error) {
          console.error("Error:", error);
          setError(error.message);
          return;
        }

        setProducts(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
  return { products, loading, error };
}

export default useProducts;
