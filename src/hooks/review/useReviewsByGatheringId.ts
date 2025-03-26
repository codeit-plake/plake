import { infiniteQueryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { reviewService } from "@/services/review/ReviewService";
import { IReviewResponse } from "@/types/review";

export const reviewsByGatheringIdQueryOption = (gatheringId: string) =>
  infiniteQueryOptions({
    queryKey: [QUERY_KEYS.REVIEW.listByGatheringId(gatheringId)],
    queryFn: () => reviewService.getReviewsByGatheringId(gatheringId),
    throwOnError: true,
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage: IReviewResponse) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
