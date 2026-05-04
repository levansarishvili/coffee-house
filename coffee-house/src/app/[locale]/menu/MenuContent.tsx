"use client";

import useProducts from "@/app/hooks/useProducts";
import CategorySwitch from "./CategorySwitch";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { CATEGORIES } from "@/app/constants/constants";
import Loading from "../../../Loading";
import ErrorMessaege from "@/app/components/ErrorMessaege";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function MenuContent() {
  const t = useTranslations("MenuPage");
  const [category, setCategory] = useState(CATEGORIES.COFFEE);
  const { products, loading, error } = useProducts(category);

  return (
    <main className="flex flex-col gap-10 items-center justify-center">
      <h1 className="text-[32px] md:text-6xl text-center mt-5 max-w-[860px] font-semibold leading-[120%]">
        {t("headerPart-1")}
        <span className="text-accent italic">{t("headerPart-2")}</span>
      </h1>

      <CategorySwitch category={category} setCategory={setCategory} />

      {/* Show loading state */}
      {loading && <Loading />}

      {/* Show error state */}
      {error && <ErrorMessaege message={error} />}

      {!error && !loading && (
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          animate="visible"
          className="flex gap-10 flex-wrap justify-center"
        >
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </motion.div>
      )}
    </main>
  );
}
