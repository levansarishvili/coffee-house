"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import CustomerReviews from "./CustomerReviews";
import { useForm } from "react-hook-form";
import { ReviewFormDataType } from "@/app/types/interfaces";
import { Spinner } from "@/components/ui/spinner";
import { addReview } from "@/utils/addReview";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ProductRating {
  isAuthenticated: boolean;
  productId: number;
  onReviewAdded: (newRating: number) => void;
}

export default function ProductRating({
  isAuthenticated,
  productId,
  onReviewAdded,
}: ProductRating) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm<ReviewFormDataType>({
    mode: "all",
  });
  const t = useTranslations("ProductDetailsPage");

  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Handle product review
  async function handleReview(formData: ReviewFormDataType) {
    const updatedFormData = new FormData();

    updatedFormData.append("rating", rating.toString());
    updatedFormData.append("comment", formData.comment);
    updatedFormData.append("product_id", productId.toString());

    try {
      setIsLoading(true);
      await addReview(updatedFormData);

      toast.success("Review added successfully!");
      setRating(0);
      setRefreshKey((prev) => prev + 1);
      // Pass the new rating to parent before resetting
      onReviewAdded(rating);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.success(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <h2 className="font-semibold text-xl md:text-2xl">
        {t("Reviews.header")}
      </h2>

      <div
        className={`${
          isAuthenticated
            ? "grid grid-cols-1 lg:grid-cols-2"
            : "flex justify-center"
        }  gap-16 w-full`}
      >
        {/* Render review form if user is authenticated */}
        {isAuthenticated && (
          <section className="w-full items-center flex flex-col gap-5">
            <form
              onSubmit={handleSubmit(handleReview)}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="flex flex-col w-full relative">
                <div className="w-full flex flex-col gap-1.5">
                  <label htmlFor="comment">{t("Reviews.commentLabel")}</label>
                  <textarea
                    id="comment"
                    placeholder={t("Reviews.commentPlaceholder")}
                    className={`w-full h-20 border border-[#665f55] p-3 rounded-xl focus:outline-none 
                      placeholder:font-normal placeholder:text-sm ${
                        errors.comment
                          ? "border-error focus:outline-error"
                          : touchedFields.comment &&
                            watch("comment") &&
                            !errors.comment
                          ? "border-success focus:outline-success"
                          : "border-[#c1b6ad] dark:border-[#665f55]"
                      }`}
                    {...register("comment", {
                      required: `${t(
                        "Reviews.ErrorMessages.comment.required"
                      )}`,
                      minLength: {
                        value: 10,
                        message: `${t(
                          "Reviews.ErrorMessages.comment.minLength"
                        )}`,
                      },
                      maxLength: {
                        value: 500,
                        message: `${t(
                          "Reviews.ErrorMessages.comment.maxLength"
                        )}`,
                      },
                    })}
                  />
                </div>

                {/* Error message */}
                {errors.comment && (
                  <p
                    className={`${
                      errors.comment.message ? "absolute -bottom-5" : "hidden"
                    } font-normal text-error text-xs mt-1`}
                  >
                    {errors.comment.message?.toString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <p className="">{t("Reviews.ratingLabel")}</p>
                <StarRating rating={rating} setRating={setRating} />
              </div>

              <button
                className="flex items-center gap-3 justify-center max-w-50 w-full border border-[#665f55] hover:bg-[#665f55] 
          hover:text-[#e1d4c9] transition-all duration-300 
          rounded-[100px] h-11 font-semibold cursor-pointer"
                type="submit"
                disabled={isLoading || !isValid ? true : false}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    {t("Reviews.submitButtonLoading")}...
                  </>
                ) : (
                  <>{t("Reviews.submitButton")}</>
                )}
              </button>
            </form>
          </section>
        )}

        {/* Customer reviews */}
        <CustomerReviews product_id={productId} refreshKey={refreshKey} />
      </div>
    </div>
  );
}
