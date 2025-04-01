import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";

import Avatar from "@/components/common/Avatar";
import Rating from "@/components/common/Rating";
import useUserStore from "@/stores/useUserStore";
import { IReview } from "@/types/review";

type TReviewCardItemProps = {
  review: IReview;
};

const ReviewCardItem = ({ review }: TReviewCardItemProps) => {
  const { comment, createdAt, score, User, Gathering } = review;
  const { user } = useUserStore(useShallow(state => ({ user: state.user })));
  const pathName = usePathname();

  const myReviewChk = pathName === "/mypage/reviews" && User.id === user?.id;

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <Link
        href={`/gathering/detail/${Gathering.id}`}
        style={{ display: "contents" }}
      >
        <div className="relative min-h-[156px] w-full max-w-[280px] overflow-hidden rounded-3xl">
          <Image
            src={Gathering.image ?? "https://picsum.photos/500/700"}
            alt={Gathering.name}
            fill
            sizes="(max-width: 768px)"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex min-h-[156px] flex-1 flex-col gap-[10px] border-b-2 border-dashed border-gray-200 pb-4">
          <Rating rating={score} />
          <p className="min-h-[56px] text-sm font-medium text-gray-700">
            {comment}
          </p>
          <div className="text-xs font-medium text-gray-700">
            <span className="mr-2">{Gathering.name}</span>
            <span>{Gathering.location}</span>
          </div>
          <div className="flex items-center gap-2">
            {myReviewChk || (
              <Avatar type="default" size="small" imgPath={User.image ?? ""} />
            )}

            <p className="flex text-xs font-medium">
              {myReviewChk || (
                <span className="text-gray-700 after:mx-[6px] after:text-gray-500 after:content-['|']">
                  {User.name}
                </span>
              )}

              <time className="text-gray-500" suppressHydrationWarning>
                {dayjs(createdAt).format("YYYY.MM.DD")}
              </time>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ReviewCardItem;
