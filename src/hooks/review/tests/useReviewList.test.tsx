import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import React, { Suspense } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import anonReviewService from "@/services/review/AnonReviewService";
import { IReviewResponse } from "@/types/review";
import { mockReviews } from "@/utils/test-utils/reviewMocking";

import { prefetchReviewList, useSuspenseReviewList } from "../useReviewList";

jest.mock("@/services/review/AnonReviewService", () => ({
  getReviewList: jest.fn(),
}));

const createMockResponse = (
  pageIndex: number,
  filterLocation?: boolean,
): IReviewResponse => {
  const reviews = mockReviews(10).map((review, idx) => ({
    ...review,
    id: pageIndex * 10 + idx + 1,
    Gathering: {
      ...review.Gathering,
      location: filterLocation && idx % 2 === 0 ? "홍대입구" : "강남",
    },
  }));

  return {
    data: reviews,
    totalItemCount: 30,
    currentPage: pageIndex,
    totalPages: 3,
  };
};

describe("useReviewList 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe("useSuspenseReviewList", () => {
    it("리뷰 목록을 올바르게 가져온다", async () => {
      const mockResponse = createMockResponse(0);
      (anonReviewService.getReviewList as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </QueryClientProvider>
      );

      await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.REVIEW.listByQueryParams()],
        queryFn: () => mockResponse,
        initialPageParam: "0",
      });

      const { result } = renderHook(() => useSuspenseReviewList(false), {
        wrapper,
      });

      expect(result.current.data.pages).toHaveLength(1);
      expect(result.current.data.pages[0].data).toHaveLength(10);
      expect(result.current.hasNextPage).toBe(true);
      expect(result.current.data.pages[0].totalPages).toBe(3);
    });

    it("isFilter가 true일 때 홍대입구 위치를 필터링한다", async () => {
      const mockResponse = createMockResponse(0, true);
      (anonReviewService.getReviewList as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </QueryClientProvider>
      );

      await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.REVIEW.listByQueryParams()],
        queryFn: () => mockResponse,
        initialPageParam: "0",
      });

      const { result } = renderHook(() => useSuspenseReviewList(true), {
        wrapper,
      });

      const filteredData = result.current.data.pages[0].data;
      expect(filteredData.length).toBeLessThan(10);
      expect(
        filteredData.every(review => review.Gathering.location !== "홍대입구"),
      ).toBe(true);
    });

    it("검색 파라미터가 queryKey에 포함된다", async () => {
      const searchParams = { keyword: "테스트", location: "강남" };
      const mockResponse = createMockResponse(0);
      (anonReviewService.getReviewList as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      const fetchQuerySpy = jest.spyOn(queryClient, "fetchInfiniteQuery");

      await prefetchReviewList(queryClient, searchParams);

      expect(fetchQuerySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: [QUERY_KEYS.REVIEW.listByQueryParams(searchParams)],
        }),
      );
    });
  });

  describe("prefetchReviewList", () => {
    it("queryClient를 사용하여 데이터를 미리 가져온다", async () => {
      const mockResponse = createMockResponse(0);
      (anonReviewService.getReviewList as jest.Mock).mockResolvedValue(
        mockResponse,
      );

      await prefetchReviewList(queryClient);

      const cachedData = queryClient.getQueryData([
        QUERY_KEYS.REVIEW.listByQueryParams(),
      ]);
      expect(cachedData).toBeDefined();

      expect(anonReviewService.getReviewList).toHaveBeenCalledTimes(1);
    });

    it("마지막 페이지에 도달하면 hasNextPage가 false가 된다", async () => {
      const mockLastPageResponse: IReviewResponse = {
        data: mockReviews(5),
        totalItemCount: 5,
        currentPage: 0,
        totalPages: 1,
      };

      (anonReviewService.getReviewList as jest.Mock).mockResolvedValue(
        mockLastPageResponse,
      );

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </QueryClientProvider>
      );

      await prefetchReviewList(queryClient);

      const { result } = renderHook(() => useSuspenseReviewList(false), {
        wrapper,
      });

      // hasNextPage가 false인지 확인
      expect(result.current.hasNextPage).toBe(false);
    });
  });
});
