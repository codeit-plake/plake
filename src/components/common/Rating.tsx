"use client";

import clsx from "clsx";
import { FaHeart } from "react-icons/fa6";

import { createRatingHandler } from "@/utils/rating";

const HEART_COLOR = {
  filled: "text-purple-600",
  empty: "text-gray-200",
} as const;

interface IRatingProps {
  rating?: number;
  isEditable?: boolean;
  onRatingChange?: (rating: number) => void;
}

const Rating = ({
  rating = 0,
  isEditable = false,
  onRatingChange,
}: IRatingProps) => {
  const roundedRating = Math.round(rating);
  const totalHearts = 5;

  const handleRatingChange = createRatingHandler({
    onRatingChange: onRatingChange ?? (() => {}),
    isEditable,
  });

  return (
    <div className={clsx("flex items-center gap-2")} aria-label="별점">
      {Array.from({ length: totalHearts }).map((_, index) => (
        <button
          key={index}
          onClick={e => handleRatingChange(e, index)}
          className={clsx(isEditable ? "cursor-pointer" : "cursor-default")}
          data-testid={`rating-heart-${index + 1}`}
          aria-label="rating-button"
        >
          <FaHeart
            data-testid="heart-icon"
            className={
              index < roundedRating ? HEART_COLOR.filled : HEART_COLOR.empty
            }
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
