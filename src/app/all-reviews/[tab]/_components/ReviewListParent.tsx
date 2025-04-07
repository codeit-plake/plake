"use client";

import { useParams, useSearchParams } from "next/navigation";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import ReviewCardList from "@/components/layout/ReviewCardList";
import { SERVICE_LIST } from "@/constants/gathering";
import { useSuspenseReviewList } from "@/hooks/review/useReviewList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { TReviewQueryParams } from "@/types/review";

const ReviewListParent = () => {
  const { tab } = useParams();
  const searchParams = useSearchParams();
  const online = SERVICE_LIST.ONLINE;
  const isOnline = tab === online.value;

  const type = isOnline ? online.type : searchParams.get("type");
  let location;
  if (searchParams.get("location") !== "전체") {
    location = isOnline ? online.location : searchParams.get("location");
  } else {
    location = "";
  }
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  const reviewQueryParams: TReviewQueryParams = {
    ...(type && { type }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(location && { location }),
    ...(date && { date }),
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseReviewList(!isOnline, reviewQueryParams);

  const flatData = data?.pages.flatMap(page => page.data);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <>
      {flatData.length > 0 ? (
        <>
          <ReviewCardList reviews={flatData} />
          <div ref={setTarget} className="h-10 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center p-4">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex min-h-40 w-full items-center justify-center">
          <p className="text-sm font-medium text-gray-500">
            아직 리뷰가 없어요
          </p>
        </div>
      )}
    </>
  );
};

export default ReviewListParent;
