"use client";

import { RATING_STARS } from "@/app/constants/constants";
import useReviews from "@/app/hooks/useReviews";
import Loading from "@/Loading";
import { UserIcon } from "@heroicons/react/16/solid";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface CustomerReviewsProps {
  product_id: number;
  refreshKey: number;
}

export default function CustomerReviews({
  product_id,
  refreshKey,
}: CustomerReviewsProps) {
  const { reviews, loading } = useReviews(product_id, refreshKey);

  return (
    <section className="flex items-center flex-col gap-5">
      <h2 className="font-semibold text-xl md:text-2xl">
        Customer Reviews ({reviews.length})
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-6 w-full mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="max-w-[400px] w-full flex items-start gap-4 p-4 rounded-2xl shadow-md"
            >
              {/* Avatar */}
              <div className="">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  {review.user_avatar_url ? (
                    <Image
                      src={review.user_avatar_url}
                      alt={review.user_name || "User avatar"}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm md:text-base text-foreground">
                    {review.user_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.created_at as string)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: RATING_STARS }, (_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-4 h-4 ${
                        review.rating > index
                          ? "text-yellow-600 fill-yellow-600"
                          : "opacity-30 fill-primary"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
