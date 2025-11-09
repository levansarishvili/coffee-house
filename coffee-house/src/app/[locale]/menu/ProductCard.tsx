import { RATING_STARS } from "@/app/constants/constants";
import { useAuth } from "@/app/context/useAuth";
import useReviews from "@/app/hooks/useReviews";
import { Product } from "@/app/types/interfaces";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const { user } = useAuth();
  const { reviews } = useReviews(product.id);

  // Calculate average rating
  const averageRating =
    (reviews &&
      reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length) ||
    5;

  let isAuthenticated = false;
  if (user) {
    isAuthenticated = true;
  }
  const showDiscountedPrice = isAuthenticated && product?.discount_price;

  return (
    <Link
      href={`/${product.id}`}
      className="flex flex-col justify-between w-full max-w-[310px] rounded-[40px] border border-border dark:border-border-dark overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-500"
    >
      <div className="max-w-[310px] max-h-[310px] rounded-[40px] overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          width={310}
          height={310}
          className="w-full h-full scale-[1.1] group-hover:scale-100 transition-all duration-500"
        />
      </div>

      <div className="p-5 flex flex-col justify-between gap-4 h-60">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-[125%]">
            {product.name}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: RATING_STARS }, (_, index) => (
              <StarIcon
                key={index}
                className={`w-5 h-5 ${
                  averageRating > index
                    ? "opacity-100 text-yellow-600 fill-yellow-600"
                    : "opacity-30 fill-primary"
                }`}
              />
            ))}
          </div>

          <p className="font-normal text-base leading-[150%]">
            {product.description}
          </p>
        </div>
        <div className="flex gap-4">
          {showDiscountedPrice ? (
            <>
              <span className="font-semibold text-2xl opacity-60 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-semibold text-2xl">
                ${product.discount_price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-2xl">
              ${product.price?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
