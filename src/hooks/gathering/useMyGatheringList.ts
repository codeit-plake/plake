import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";
import { IMyGathering, IMyGatheringFilterParams } from "@/types/gathering";

const DEFAULT_LIMIT = 10;

export const createPaginationParams = (
  page: number,
  limit: number = DEFAULT_LIMIT,
): Pick<IMyGatheringFilterParams, "offset" | "limit"> => {
  return {
    offset: String((page - 1) * limit),
    limit: String(limit),
  };
};

export const fetchMyGatheringList = async (
  queryParams: IMyGatheringFilterParams,
  pageParam: number,
  limit: number = DEFAULT_LIMIT,
): Promise<IMyGathering[]> => {
  const { offset, limit: finalLimit } = createPaginationParams(
    pageParam,
    limit,
  );

  return gatheringService.getMyGatheringList({
    ...queryParams,
    offset,
    limit: finalLimit,
  });
};

export const myGatheringQueryOptions = (
  params: IMyGatheringFilterParams = {},
) => {
  const limit = DEFAULT_LIMIT;
  const offset = ((params.offset ? Number(params.offset) : 0) / limit) * limit;

  const queryParams: IMyGatheringFilterParams = {
    ...params,
    sortBy: params.sortBy ?? "dateTime",
    sortOrder: params.sortOrder ?? "desc",
    limit: String(limit),
    offset: String(offset),
  };

  return {
    queryKey: [QUERY_KEYS.GATHERING.myList, queryParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyGatheringList(queryParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: IMyGathering[], pages: IMyGathering[][]) => {
      const nextPage = pages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },
    throwOnError: true,
    retry: false,
  };
};

export const useSuspenseMyGatheringList = (
  params: IMyGatheringFilterParams = {},
) => {
  const { data, hasNextPage, fetchNextPage, status } = useSuspenseInfiniteQuery(
    myGatheringQueryOptions(params),
  );

  return { data, hasNextPage, fetchNextPage, status };
};
