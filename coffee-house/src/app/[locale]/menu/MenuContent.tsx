"use client";

import useProducts from "@/app/hooks/useProducts";
import CategorySwitch from "./CategorySwitch";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { CATEGORIES } from "@/app/constants/constants";
import Loading from "./Loading";
import ErrorMessaege from "@/app/components/ErrorMessaege";

export default function MenuContent() {
  const [category, setCategory] = useState(CATEGORIES.COFFEE);
  const { products, loading, error } = useProducts(category);
  console.log(products);

  return (
    <main className="flex flex-col gap-10 items-center justify-center">
      <h1 className="text-4xl md:text-6xl text-center mt-5 max-w-[800px] font-semibold leading-[120%]">
        Behind each of our cups hides an
        <span className="text-accent italic">amazing surprise</span>
      </h1>

      <CategorySwitch category={category} setCategory={setCategory} />

      {/* Show loading state */}
      {loading && <Loading />}

      {/* Show error state */}
      {error && <ErrorMessaege message={error} />}

      {!error && !loading && (
        <div className="">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </main>
  );
}
