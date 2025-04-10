import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import GatheringFilterTab from "../GatheringFilterTab";
import GatheringMainTab from "../GatheringMainTab";
import GatheringSubTab from "../GatheringSubTab";

describe("FilterTab 컴포넌트 테스트", () => {
  it("GatheringMainTab 렌더링", () => {
    render(<GatheringMainTab pathname="/gathering/offline" />);

    expect(screen.getByLabelText("오프라인 탭")).toMatchSnapshot();
  });

  it("GatheringSubTab 렌더링", () => {
    render(<GatheringSubTab pathname="/gathering/offline" />);

    expect(screen.getByLabelText("오프라인 전체 탭")).toMatchSnapshot();
  });

  it("FilterTab 렌더링", async () => {
    render(<GatheringFilterTab />);

    expect(screen.getByLabelText("주제 탭")).toMatchSnapshot();
  });
});
