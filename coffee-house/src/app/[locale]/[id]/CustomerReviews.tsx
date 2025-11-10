"use client";

import { RATING_STARS } from "@/app/constants/constants";
import useReviews from "@/app/hooks/useReviews";
import Loading from "@/Loading";
import { UserIcon } from "@heroicons/react/16/solid";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
    <section
      className={`mt-[30px] flex items-center w-full ${
        !reviews || reviews.length === 0 ? "justify-center" : ""
      } flex-col gap-5 w-full`}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-6 w-full mx-auto">
          {!reviews || reviews.length === 0 ? (
            <p className="flex gap-2 items-center justify-center font-medium text-base md:text-lg">
              <MagnifyingGlassIcon className="w-6 h-6 stroke-2" />
              <span>No reviews yet</span>
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="max-w-[500px] w-full flex items-start gap-4 p-4 rounded-2xl border 
              border-[#c1b6ad] dark:border-[#665f55]"
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

                  <div className="flex justify-between w-full">
                    {/* Comment */}
                    <p className="text-sm">{review.comment}</p>
                  </div>

                  {review.purchased_status && (
                    <p className="rounded-xl bg-[#665f55] mt-2 p-1 max-w-36 flex gap-1 font-semibold items-center center text-xs text-[#e1d4c9]">
                      <CheckIcon className="w-4 h-4 stroke-2" />
                      <span> Verified Purchase</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
