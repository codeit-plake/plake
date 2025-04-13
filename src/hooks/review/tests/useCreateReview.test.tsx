import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useCreateReview } from "@/hooks/review/useCreateReview";
import { TReviewForm } from "@/schemas/reviewSchema";
import reviewService from "@/services/review/ReviewService";

jest.mock("@/services/review/ReviewService");

const mockInvalidateQueries = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  jest
    .spyOn(queryClient, "invalidateQueries")
    .mockImplementation(mockInvalidateQueries);

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useCreateReview", () => {
  const mockData: TReviewForm = {
    gatheringId: 1,
    score: 5,
    comment: "좋은 모임이었습니다.",
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("리뷰 등록 성공 시 invalidateQueries가 호출된다.", async () => {
    (reviewService.createReview as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useCreateReview(), {
      wrapper: createWrapper(),
    });

    await act(() => result.current.handleCreateReview(mockData));

    expect(reviewService.createReview).toHaveBeenCalledWith(mockData);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEYS.GATHERING.myList],
    });
  });

  it("리뷰 등록 실패 시 console.error가 호출된다.", async () => {
    const mockError = new Error("등록 실패");
    (reviewService.createReview as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateReview(), {
      wrapper: createWrapper(),
    });

    await act(() =>
      result.current.handleCreateReview(mockData).catch(() => {}),
    );

    expect(console.error).toHaveBeenCalledWith("리뷰 생성 실패:", mockError);
  });
});
