import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import MainTab from "../MainTab";

describe("MainTab 컴포넌트 테스트", () => {
  it("오프라인 탭 렌더링", async () => {
    render(<MainTab active={true} name={"오프라인"} />);

    expect(screen.getByText("오프라인")).toBeInTheDocument();
  });

  it("온라인 탭 렌더링", async () => {
    render(<MainTab active={true} name={"온라인"} />);

    expect(screen.getByText("온라인")).toBeInTheDocument();
  });
});
