import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import anonReviewService from "@/services/review/AnonReviewService";
import { IReview, IReviewResponse, TReviewQueryParams } from "@/types/review";

const initialPageParam = "0";

const filterByValue = (
  data: InfiniteData<IReviewResponse>,
  isFilter: boolean,
): InfiniteData<IReviewResponse> => {
  if (!isFilter) return data;

  return {
    pages: data.pages.map(page => ({
      ...page,
      data: page.data.filter(
        (review: IReview) => review.Gathering.location !== "홍대입구",
      ),
    })),
    pageParams: data.pageParams,
  };
};

const reviewListQueryOption = (
  isFilter: boolean,
  searchParams?: TReviewQueryParams,
) =>
  infiniteQueryOptions({
    queryKey: [QUERY_KEYS.REVIEW.listByQueryParams(searchParams)],
    queryFn: ({ pageParam = initialPageParam }) => {
      const mergedParams = {
        ...searchParams,
        offset: pageParam,
      };

      return anonReviewService.getReviewList(mergedParams);
    },
    initialPageParam,
    getNextPageParam: (
      lastPage: IReviewResponse,
      allPages: IReviewResponse[],
    ) => {
      if (
        lastPage.data.length === 0 ||
        allPages.length >= lastPage.totalPages
      ) {
        return undefined;
      }

      const currentOffset = allPages.length * 10;
      return currentOffset.toString();
    },
    select: data => filterByValue(data, isFilter),
  });

export const useSuspenseReviewList = (
  isFilter: boolean,
  searchParams?: TReviewQueryParams,
) => {
  return useSuspenseInfiniteQuery(
    reviewListQueryOption(isFilter, searchParams),
  );
};

export const prefetchReviewList = (
  queryClient: QueryClient,
  searchParams?: TReviewQueryParams,
) => {
  return queryClient.prefetchInfiniteQuery(
    reviewListQueryOption(false, searchParams),
  );
};
