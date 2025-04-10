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
    <div
      className={clsx(
        "flex items-center gap-2",
        isEditable && "cursor-pointer",
      )}
    >
      {Array.from({ length: totalHearts }).map((_, index) => (
        <div
          key={index}
          onClick={e => handleRatingChange(e, index)}
          className={clsx(isEditable && "cursor-pointer")}
          data-testid={`rating-heart-${index + 1}`}
        >
          <FaHeart
            className={
              index < roundedRating ? HEART_COLOR.filled : HEART_COLOR.empty
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Rating;
