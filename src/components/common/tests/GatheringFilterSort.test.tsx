import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import GatheringFilterSort from "../GatheringFilterSort";

describe("GatheringFilterSort 컴포넌트 테스트", () => {
  it("GatheringFilterSort 렌더링", () => {
    render(<GatheringFilterSort />);

    expect(screen.getByLabelText("필터 정렬 드롭다운")).toBeInTheDocument();
  });
});
