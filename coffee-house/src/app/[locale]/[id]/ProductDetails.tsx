"use client";

import ErrorMessaege from "@/app/components/ErrorMessaege";
import useProductById from "@/app/hooks/useProductById";
import Loading from "@/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import SizeSelect from "./SizeSelect";
import AdditiveSelect from "./AdditiveSelect";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/useAuth";
import { addToCart } from "@/utils/addToCart";
import { CartItemType } from "@/app/types/interfaces";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface ProductDetailsProps {
  id: string;
  locale: string;
}

export default function ProductDetails({ id, locale }: ProductDetailsProps) {
  const { user } = useAuth();
  const { product, loading, error } = useProductById(id);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("s");
  const [selectedAdditives, setSelectedAdditives] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  console.log(product);

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  }

  // Calculate total price and total discounted price
  useEffect(() => {
    if (product && selectedSize) {
      // Find selected size
      const selectedSizeData = product.product_sizes.find(
        (size) => selectedSize === size.size_key
      );

      if (selectedSizeData) {
        const basePrice = selectedSizeData.price;
        const baseDiscountedPrice = selectedSizeData.discount_price;

        // Calculate additives total
        const additivesTotal = product.product_additives
          .filter((additive) => selectedAdditives.includes(additive.id))
          .reduce((total, additive) => total + additive.price, 0);

        // Calculate additives discounted total (if available)
        const additivesDiscountedTotal = product.product_additives
          .filter((additive) => selectedAdditives.includes(additive.id))
          .reduce(
            (total, additive) =>
              total + (additive.discount_price || additive.price),
            0
          );

        // Calculate final totals
        const finalTotalPrice = basePrice + additivesTotal;
        const finalDiscountedPrice = baseDiscountedPrice
          ? baseDiscountedPrice + additivesDiscountedTotal
          : basePrice + additivesDiscountedTotal;

        setTotalPrice(finalTotalPrice);
        setDiscountedPrice(finalDiscountedPrice);
      }
    }
  }, [product, selectedSize, selectedAdditives]);

  const showDiscountedPrice =
    totalPrice &&
    discountedPrice &&
    isAuthenticated &&
    totalPrice > discountedPrice;

  // Handle add to cart product
  async function handleAddToCart() {
    if (product) {
      const size = product?.product_sizes.filter(
        (size) => size.size_key === selectedSize
      )[0].size_label;
      const additives = product?.product_additives
        .filter((additive) => selectedAdditives.includes(additive.id))
        .map((additive) => additive.name);

      const cartItemData: CartItemType = {
        product_id: product.id,
        name: product.name,
        price: totalPrice as number,
        discount_price: discountedPrice as number,
        size,
        additives,
        image_url: product?.image_url,
        quantity: 1,
      };

      // Add to the supabase temporary_cart table
      try {
        setIsLoading(true);
        const result = await addToCart(isAuthenticated, cartItemData);
        console.log(result);
        if (result.action === "updated") {
          toast.success("Product quantity updated in cart!");
        } else {
          toast.success("Product added to cart successfully!");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.success(error.message);
        }
        console.error("Failed to add to cart:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

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
              isAuthenticated={isAuthenticated}
              product_sizes={product.product_sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <AdditiveSelect
              isAuthenticated={isAuthenticated}
              product_additives={product.product_additives}
              selectedAdditives={selectedAdditives}
              setSelectedAdditives={setSelectedAdditives}
            />

            <div className="flex justify-between">
              <span className="font-semibold text-2xl">Total:</span>
              <div className="flex gap-5 justify-center items-center">
                {showDiscountedPrice ? (
                  <>
                    <span className="font-semibold text-2xl opacity-60 line-through">
                      ${totalPrice?.toFixed(2)}
                    </span>
                    <span className="font-semibold text-2xl">
                      ${discountedPrice?.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-2xl">
                    ${totalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex gap-4 justify-center items-center border py-2.5 px-[78px] border-[#665f55] hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300 rounded-[100px] cursor-pointer font-semibold"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Adding to cart...
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="w-7 h-7" />
                  <span>Add to cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
