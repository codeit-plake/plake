import { screen } from "@testing-library/react";

import MyReviewCardList from "@/app/mypage/_components/my-card-list/MyReviewCardList";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseMyGatheringList as _useSuspenseMyGatheringList } from "@/hooks/gathering/useMyGatheringList";
import { mockMyGatherings } from "@/utils/test-utils/myGatheringMocking";
import { renderWithClient } from "@/utils/test-utils/renderWithClient";

jest.mock("@/hooks/gathering/useMyGatheringList");
jest.mock("@/hooks/useIntersectionObserver", () => ({
  __esModule: true,
  default: () => ({
    setTarget: jest.fn(),
  }),
}));

const mockUseSuspenseMyGatheringList = _useSuspenseMyGatheringList as jest.Mock;

describe("MyReviewCardList", () => {
  it("gathering이 없을 경우 EmptyState가 렌더링된다.", () => {
    mockUseSuspenseMyGatheringList.mockReturnValue({
      data: { pages: [] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    renderWithClient(<MyReviewCardList />);
    expect(screen.getByText(EMPTY_MESSAGE.mypage.reviews)).toBeInTheDocument();
  });

  it("gathering이 있을 경우 카드 아이템이 렌더링된다.", () => {
    const mockGatherings = mockMyGatherings(2);

    mockUseSuspenseMyGatheringList.mockReturnValue({
      data: { pages: [mockGatherings] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    renderWithClient(<MyReviewCardList />);
    mockGatherings.forEach(gathering => {
      expect(screen.getByText(gathering.name)).toBeInTheDocument();
    });
  });

  it("status가 error일 경우 에러 메시지가 표시된다.", () => {
    const mockGatherings = mockMyGatherings(2);

    mockUseSuspenseMyGatheringList.mockReturnValue({
      data: { pages: [mockGatherings] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "error",
    });

    renderWithClient(<MyReviewCardList />);
    expect(screen.getByRole("alert")).toHaveTextContent("에러가 발생했습니다.");
  });
});
