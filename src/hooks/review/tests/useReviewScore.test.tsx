import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import React, { Suspense } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import anonReviewService from "@/services/review/AnonReviewService";
import { IScore } from "@/types/review/score";

import { prefetchReviewScore, useSuspenseReviewScore } from "../useReviewScore";

jest.mock("@/services/review/AnonReviewService", () => ({
  getReviewScore: jest.fn(),
}));

const mockReviewScore: IScore[] = [
  {
    teamId: 1,
    oneStar: 10,
    twoStars: 15,
    threeStars: 20,
    fourStars: 25,
    fiveStars: 30,
    averageScore: 4.5,
  },
];

describe("useReviewScore 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    (anonReviewService.getReviewScore as jest.Mock).mockResolvedValue(
      mockReviewScore,
    );
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe("useSuspenseReviewScore", () => {
    it("리뷰 점수 데이터를 올바르게 가져온다", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </QueryClientProvider>
      );

      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.REVIEW.score],
        queryFn: () => mockReviewScore,
      });

      const { result } = renderHook(() => useSuspenseReviewScore(), {
        wrapper,
      });

      expect(result.current.data).toEqual(mockReviewScore);
      expect(result.current.data).toBeInstanceOf(Array);
      expect(result.current.data?.length).toBe(1);

      const firstScore = result.current.data?.[0];
      expect(firstScore).toBeDefined();
      expect(firstScore?.teamId).toBe(1);
      expect(firstScore?.averageScore).toBe(4.5);
      expect(firstScore?.oneStar).toBe(10);
      expect(firstScore?.twoStars).toBe(15);
      expect(firstScore?.threeStars).toBe(20);
      expect(firstScore?.fourStars).toBe(25);
      expect(firstScore?.fiveStars).toBe(30);
    });

    it("queryKey가 [QUERY_KEYS.REVIEW.score]를 사용한다", async () => {
      const fetchQuerySpy = jest.spyOn(queryClient, "fetchQuery");

      await prefetchReviewScore(queryClient);

      expect(fetchQuerySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: [QUERY_KEYS.REVIEW.score],
        }),
      );
    });
  });

  describe("prefetchReviewScore", () => {
    it("queryClient를 사용하여 데이터를 미리 가져온다", async () => {
      await prefetchReviewScore(queryClient);

      const cachedData = queryClient.getQueryData<IScore[]>([
        QUERY_KEYS.REVIEW.score,
      ]);
      expect(cachedData).toEqual(mockReviewScore);
      expect(cachedData).toBeInstanceOf(Array);
      expect(cachedData?.length).toBe(1);

      const firstScore = cachedData?.[0];
      expect(firstScore?.teamId).toBe(1);
      expect(firstScore?.averageScore).toBe(4.5);
      expect(firstScore?.oneStar).toBe(10);
      expect(firstScore?.twoStars).toBe(15);
      expect(firstScore?.threeStars).toBe(20);
      expect(firstScore?.fourStars).toBe(25);
      expect(firstScore?.fiveStars).toBe(30);

      expect(anonReviewService.getReviewScore).toHaveBeenCalledTimes(1);
    });
  });
});
