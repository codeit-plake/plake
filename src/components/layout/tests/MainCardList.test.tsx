import { screen } from "@testing-library/react";

import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseGatheringInfiniteList as _useSuspenseGatheringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import { mockGatherings } from "@/utils/test-utils/gatheringMocking";
import { renderWithClient } from "@/utils/test-utils/renderWithClient";

import MainCardList from "../MainCardList";

jest.mock("@/hooks/gathering/useGatheringInfiniteList");
jest.mock("@/hooks/useIntersectionObserver", () => ({
  __esModule: true,
  default: () => ({
    setTarget: jest.fn(),
  }),
}));

const mockUseSuspenseInfiniteGatheringList =
  _useSuspenseGatheringInfiniteList as jest.Mock;

describe("MainCardList 컴포넌트 테스트", () => {
  it("gathering이 없을 경우 EmptyState이 렌더링된다.", () => {
    mockUseSuspenseInfiniteGatheringList.mockReturnValue({
      data: { pages: [] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    renderWithClient(<MainCardList tab={"OFFLINE"} />);
    expect(
      screen.getByText(EMPTY_MESSAGE.mypage.gatherings),
    ).toBeInTheDocument();
  });

  it("gathering이 있을 경우 카드 아이템이 렌더링된다.", () => {
    const mockGatheringsCard = mockGatherings(5);

    mockUseSuspenseInfiniteGatheringList.mockReturnValue({
      data: { pages: [mockGatheringsCard] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "success",
    });

    renderWithClient(<MainCardList tab={"OFFLINE"} />);
    mockGatheringsCard.forEach(gathering => {
      expect(screen.getByText(gathering.name)).toBeInTheDocument();
    });
  });

  it("status가 error일 경우 에러 메시지가 표시된다.", () => {
    const mockGatheringsCard = mockGatherings(5);

    mockUseSuspenseInfiniteGatheringList.mockReturnValue({
      data: { pages: [mockGatheringsCard] },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      status: "error",
    });

    renderWithClient(<MainCardList tab={"OFFLINE"} />);
    expect(screen.getByRole("alert")).toHaveTextContent("에러가 발생했습니다.");
  });
});
