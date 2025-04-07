import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import FilterTab from "../FilterTab";

describe("FilterTab 컴포넌트 테스트", () => {
  it("FilterTab이 렌더링된다.", async () => {
    render(<FilterTab />);

    expect(screen.getByLabelText("주제 탭")).toBeInTheDocument();
  });
});
