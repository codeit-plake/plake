import dayjs from "dayjs";

import Avatar from "@/components/common/Avatar";
import Rating from "@/components/common/Rating";
import { IReview } from "@/types/review";

interface IGatheringReviewItemProps {
  review: IReview;
}

const GatheringReviewItem = ({ review }: IGatheringReviewItemProps) => {
  const { comment, createdAt, score, User } = review;

  return (
    <article className="flex flex-col gap-4">
      <Rating rating={score} />
      <p className="text-sm font-medium text-gray-700">{comment}</p>
      <div className="flex items-center gap-2">
        <Avatar type="default" size="small" imgPath={User.image} />
        <p className="flex text-xs font-medium">
          <span className="text-gray-700 after:mx-[6px] after:text-gray-500 after:content-['|']">
            {User.name}
          </span>

          <time className="text-gray-500" suppressHydrationWarning>
            {dayjs(createdAt).format("YYYY.MM.DD")}
          </time>
        </p>
      </div>
      <hr className="border-b-2 border-dashed border-gray-200" />
    </article>
  );
};

export default GatheringReviewItem;
