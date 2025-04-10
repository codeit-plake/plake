import { render, screen } from "@testing-library/react";

import {
  closedGatheringMock,
  mockGathering,
} from "@/utils/test-utils/gatheringMocking";

import MainCardItem from "../MainCardItem";

describe("MainCardItem 컴포넌트 테스트", () => {
  //"2025-04-08 오후 5시"로 타이머 고정
  jest.useFakeTimers().setSystemTime(new Date("2025-04-08 17:00:00"));

  it("MainCardItem이 렌더링된다.", () => {
    const gathering = mockGathering();
    render(<MainCardItem gathering={gathering} />);

    expect(screen.getByLabelText("모임 카드")).toBeInTheDocument();
  });

  it("마감된 MainCardItem의 경우 마감 안내가 렌더링된다.", () => {
    render(<MainCardItem gathering={closedGatheringMock} />);

    expect(screen.getByLabelText("마감 안내")).toBeInTheDocument();
  });
});
