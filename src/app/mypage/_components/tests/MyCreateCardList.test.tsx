import { render, screen } from "@testing-library/react";

import MyCreateCardList from "@/app/mypage/_components/my-card-list/MyCreateCardList";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseGatheringInfiniteList as _useSuspenseGatheringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import { mockMyGatherings } from "@/utils/test-utils/myGatheringMocking";
import { mockUser } from "@/utils/test-utils/userMocking";

jest.mock("@/hooks/gathering/useGatheringInfiniteList");
jest.mock("@/hooks/useIntersectionObserver", () => ({
  __esModule: true,
  default: () => ({
    setTarget: jest.fn(),
  }),
}));
jest.mock("@/stores/useUserStore");

const mockUseSuspenseGatheringInfiniteList =
  _useSuspenseGatheringInfiniteList as jest.Mock;

describe("MyCreateCardList", () => {
  it("gathering이 없을 경우 EmptyState가 렌더링된다.", () => {
    mockUseSuspenseGatheringInfiniteList.mockReturnValue({
      data: { pages: [] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    render(<MyCreateCardList userId={String(mockUser.id)} />);
    expect(
      screen.getByText(EMPTY_MESSAGE.mypage.gatherings),
    ).toBeInTheDocument();
  });

  it("gathering이 있을 경우 카드 아이템이 렌더링된다.", () => {
    const mockGatherings = mockMyGatherings(2);

    mockUseSuspenseGatheringInfiniteList.mockReturnValue({
      data: { pages: [mockGatherings] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    render(<MyCreateCardList userId={String(mockUser.id)} />);
    mockGatherings.forEach(gathering => {
      expect(screen.getByText(gathering.name)).toBeInTheDocument();
    });
  });

  it("status가 error일 경우 에러 메시지가 표시된다.", () => {
    const mockGatherings = mockMyGatherings(1);

    mockUseSuspenseGatheringInfiniteList.mockReturnValue({
      data: { pages: [mockGatherings] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "error",
    });

    render(<MyCreateCardList userId={String(mockUser.id)} />);
    expect(screen.getByRole("alert")).toHaveTextContent("에러가 발생했습니다.");
  });
});
