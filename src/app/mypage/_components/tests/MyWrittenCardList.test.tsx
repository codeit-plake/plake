import { render, screen } from "@testing-library/react";

import MyWrittenCardList from "@/app/mypage/_components/my-card-list/MyWrittenCardList";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseReviewList as _useSuspenseReviewList } from "@/hooks/review/useReviewList";
import { mockReviews } from "@/utils/test-utils/reviewMocking";

jest.mock("@/hooks/review/useReviewList");
jest.mock("@/hooks/useIntersectionObserver", () => ({
  __esModule: true,
  default: () => ({
    setTarget: jest.fn(),
  }),
}));

const mockUseSuspenseReviewList = _useSuspenseReviewList as jest.Mock;

describe("MyWrittenCardList", () => {
  it("리뷰가 없을 경우 EmptyState가 렌더링된다.", () => {
    mockUseSuspenseReviewList.mockReturnValue({
      data: { pages: [] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });

    render(<MyWrittenCardList userId="123" />);
    expect(screen.getByText(EMPTY_MESSAGE.mypage.written)).toBeInTheDocument();
  });

  it("리뷰가 있을 경우 ReviewCardList가 렌더링된다.", () => {
    const reviews = mockReviews(2);

    mockUseSuspenseReviewList.mockReturnValue({
      data: { pages: [{ data: reviews }] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });

    render(<MyWrittenCardList userId="123" />);
    const comments = screen.getAllByLabelText("review-comment");
    expect(comments[0]).toHaveTextContent(reviews[0].comment);
    expect(comments[1]).toHaveTextContent(reviews[1].comment);
  });

  it("다음 페이지 로딩 시 로딩 스피너가 표시된다.", () => {
    const reviews = mockReviews(1);

    mockUseSuspenseReviewList.mockReturnValue({
      data: { pages: [{ data: reviews }] },
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: true,
    });

    render(<MyWrittenCardList userId="123" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
