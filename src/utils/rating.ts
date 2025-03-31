interface IRatingValues {
  fullHearts: number;
  decimal: number;
  hasPartialHeart: boolean;
  emptyHearts: number;
}

interface ICreateRatingHandlerProps {
  onRatingChange: (rating: number) => void;
  isEditable?: boolean;
}

export const TOTAL_HEARTS = 5;

export const calculateRatingValues = (rating: number): IRatingValues => {
  const fullHearts = Math.floor(rating);
  const decimal = rating % 1;
  const hasPartialHeart = decimal > 0;
  const emptyHearts = TOTAL_HEARTS - fullHearts - (hasPartialHeart ? 1 : 0);

  return {
    fullHearts,
    decimal,
    hasPartialHeart,
    emptyHearts,
  };
};

export const getBoundingRect = (event: React.MouseEvent<HTMLDivElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  return { rect, x };
};

export const calculateHalfHeart = (
  x: number,
  width: number,
  baseIndex: number,
) => {
  const isHalf = x < width / 2;
  return baseIndex + (isHalf ? 0.5 : 1);
};

export const createRatingHandler = ({
  onRatingChange,
  isEditable = true,
}: ICreateRatingHandlerProps) => {
  return (event: React.MouseEvent<HTMLDivElement>, baseIndex: number) => {
    if (!isEditable || !onRatingChange) return;

    const { rect, x } = getBoundingRect(event);
    const rawRating = calculateHalfHeart(x, rect.width, baseIndex);

    const newRating = Math.ceil(rawRating);
    onRatingChange(newRating);
  };
};
