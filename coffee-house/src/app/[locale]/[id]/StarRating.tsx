"use client";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-8 p-5 border border-[#c1b6ad] dark:border-[#665f55] rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <Rating value={rating} onValueChange={setRating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-600" key={index} />
          ))}
        </Rating>
        <div className="text-center">
          <p className="text-sm font-medium">Rating: {rating}</p>
        </div>
      </div>
    </div>
  );
};
export default StarRating;
