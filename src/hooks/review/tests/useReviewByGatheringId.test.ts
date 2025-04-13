import { QUERY_KEYS } from "@/constants/queryKeys";
import anonReviewService from "@/services/review/AnonReviewService";
import { IReviewResponse } from "@/types/review";
import { mockResponse } from "@/utils/test-utils/reviewMocking";
import { getMockContext } from "@/utils/test-utils/testQueryClient";

import { reviewsByGatheringIdQueryOption } from "../useReviewsByGatheringId";

jest.mock("@/services/review/AnonReviewService");

describe("reviewsByGatheringIdQueryOption", () => {
  const gatheringId = "123";
  const mockContext = getMockContext(
    [QUERY_KEYS.REVIEW.listByGatheringId(gatheringId)],
    { pageParam: 1 },
  );

  it("queryFn이 올바른 데이터를 반환해야 함", async () => {
    (anonReviewService.getReviewsByGatheringId as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const queryFn = reviewsByGatheringIdQueryOption(gatheringId).queryFn!;
    const result = await queryFn(mockContext);

    expect(anonReviewService.getReviewsByGatheringId).toHaveBeenCalledWith({
      gatheringId,
    });
    expect(result).toEqual(mockResponse);
  });

  it("getNextPageParam이 다음 페이지 번호를 반환해야 함", () => {
    const getNextPageParam =
      reviewsByGatheringIdQueryOption(gatheringId).getNextPageParam;

    const currentPage = 1;
    const mockPage: IReviewResponse = { ...mockResponse, currentPage };
    const nextPage = getNextPageParam(mockPage, [], currentPage, [currentPage]);
    expect(nextPage).toBe(currentPage + 1);
  });

  it("getNextPageParam이 마지막 페이지일 경우 undefined를 반환해야 함", () => {
    const getNextPageParam =
      reviewsByGatheringIdQueryOption(gatheringId).getNextPageParam;

    const currentPage = 3;
    const lastPage: IReviewResponse = {
      ...mockResponse,
      currentPage,
      totalPages: currentPage,
    };
    const nextPage = getNextPageParam(lastPage, [], currentPage, [currentPage]);
    expect(nextPage).toBeUndefined();
  });
});
