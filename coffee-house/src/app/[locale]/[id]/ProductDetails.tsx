"use client";

import ErrorMessaege from "@/app/components/ErrorMessaege";
import useProductById from "@/app/hooks/useProductById";
import Loading from "@/Loading";
import Image from "next/image";
import { useState } from "react";
import SizeSelect from "./SizeSelect";
import AdditiveSelect from "./AdditiveSelect";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ProductDetailsProps {
  id: string;
  locale: string;
}

export default function ProductDetails({ id, locale }: ProductDetailsProps) {
  const { product, loading, error } = useProductById(id);
  const [selectedSize, setSelectedSize] = useState("s");
  const [selectedAdditives, setSelectedAdditives] = useState<number[]>([]);
  console.log(product);

  return (
    <section className="flex flex-col gap-[100px] w-full">
      {loading && <Loading />}

      {error && <ErrorMessaege message={error} />}

      {product && !loading && !error && (
        <div className="flex justify-center w-full gap-[100px]">
          <div className="max-w-[400px] rounded-[40px] overflow-hidden">
            <Image
              src={product?.image_url}
              alt={product.name}
              width={800}
              height={800}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-semibold text-2xl md:text-3xl">
              {product.name}
            </h2>
            <p className="">{product.description}</p>

            <SizeSelect
              product_sizes={product.product_sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <AdditiveSelect
              product_additives={product.product_additives}
              selectedAdditives={selectedAdditives}
              setSelectedAdditives={setSelectedAdditives}
            />

            <div className="flex justify-between">
              <span className="font-semibold text-2xl">Total:</span>
              <span className="font-semibold text-2xl">$22.00</span>
            </div>

            <button className="flex gap-4 justify-center items-center border py-2.5 px-[78px] border-[#665f55] hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300 rounded-[100px] cursor-pointer font-semibold">
              <ShoppingCartIcon className="w-7 h-7" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
