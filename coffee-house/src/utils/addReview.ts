import { ReviewFormDataType } from "@/app/types/interfaces";

export const addReview = async (data: FormData) => {
  const response = await fetch("/api/add-review", {
    method: "POST",
    body: data,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Product review failed");
  }

  return result;
};
