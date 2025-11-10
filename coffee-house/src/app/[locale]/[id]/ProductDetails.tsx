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
import { useCart } from "@/app/context/useCart";
import ProductRating from "./ProductRating";
import { StarIcon } from "lucide-react";
import { RATING_STARS } from "@/app/constants/constants";
import useReviews from "@/app/hooks/useReviews";
import { useTranslations } from "next-intl";

interface ProductDetailsProps {
  id: string;
  locale: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const t = useTranslations("ProductDetailsPage");
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const { product, loading: productLoading, error } = useProductById(id);

  const { reviews, loading: reviewsLoading } = useReviews(product?.id ?? null);
  const [ratings, setRatings] = useState<number[]>([]);
  const [averageRating, setAverageRating] = useState(5);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("s");
  const [selectedAdditives, setSelectedAdditives] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  const isLoading = productLoading;

  // Calculate average rating
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Extract all ratings from reviews
      const allRatings = reviews.map((review) => review.rating);

      // Update ratings state
      setRatings(allRatings);

      const avg =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

      setAverageRating(avg);
    } else {
      setAverageRating(5);
    }
  }, [reviews]);

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

  // Function to handle when a new review is added
  const handleReviewAdded = (newRating: number) => {
    // Optionally, you can also optimistically update the ratings
    setRatings((prev) => [...prev, newRating]);

    // Recalculate average optimistically (optional)
    const newRatings = [...ratings, newRating];
    const newAverage =
      newRatings.reduce((acc, rating) => acc + rating, 0) / newRatings.length;
    setAverageRating(newAverage);
  };

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
        setIsAddingToCart(true);
        const result = await addToCart(isAuthenticated, cartItemData);

        if (result.action === "updated") {
          toast.success("Product quantity updated in cart!");
        } else {
          toast.success("Product added to cart successfully!");
        }

        // clearCart();
        refreshCart();
      } catch (error) {
        if (error instanceof Error) {
          toast.success(error.message);
        }
        console.error("Failed to add to cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  }

  return (
    <section className="flex flex-col gap-[100px] w-full">
      {isLoading && <Loading />}

      {error && <ErrorMessaege message={error} />}

      {product && !isLoading && !error && (
        <div className="flex flex-col justify-center items-center gap-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-12 lg:gap-25">
            <div
              className="md:self-start max-w-64 max-h-64 md:max-w-80 md:max-h-80 lg:max-w-[400px] lg:max-h-[400px] rounded-[40px] 
          overflow-hidden border border-[#c1b6ad] dark:border-[#665f55]"
            >
              <Image
                src={product?.image_url}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover"
              />
            </div>

            {/* Product parameters */}
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-2xl md:text-3xl">
                {product.name}
              </h2>
              <div className="flex gap-1">
                {Array.from({ length: RATING_STARS }, (_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-5 h-5 ${
                      Math.round(averageRating) > index
                        ? "opacity-100 text-yellow-600 fill-yellow-600"
                        : "opacity-30 fill-primary"
                    }`}
                  />
                ))}
              </div>
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
                <span className="font-semibold text-xl md:text-2xl">
                  Total:
                </span>
                <div className="flex gap-5 justify-center items-center">
                  {showDiscountedPrice ? (
                    <>
                      <span className="font-semibold text-xl md:text-2xl opacity-60 line-through">
                        ${totalPrice?.toFixed(2)}
                      </span>
                      <span className="font-semibold text-xl md:text-2xl">
                        ${discountedPrice?.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-xl md:text-2xl">
                      ${totalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-center md:justify-start w-full">
                <button
                  onClick={handleAddToCart}
                  className="flex gap-4 justify-center items-center border max-w-64 w-full h-11 border-[#665f55] hover:bg-[#665f55] 
              hover:text-[#e1d4c9] transition-all duration-300 rounded-[100px] cursor-pointer font-semibold"
                  disabled={isAddingToCart ? true : false}
                >
                  {isAddingToCart ? (
                    <>
                      <Spinner />
                      {t("addToCartButtonLoading")}...
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-6 h-6" />
                      <span>{t("addToCartButton")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Product rating */}
          <ProductRating
            isAuthenticated={isAuthenticated}
            productId={product.id}
            onReviewAdded={handleReviewAdded}
          />
        </div>
      )}
    </section>
  );
}
