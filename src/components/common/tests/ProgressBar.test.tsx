import { render } from "@testing-library/react";
import { act } from "react";

import ProgressBar from "../ProgressBar";

describe("ProgressBar 컴포넌트 테스트", () => {
  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => {
      cb(0);
      return 0;
    });
  });

  it("기본 렌더링 테스트", () => {
    const { container } = render(<ProgressBar progress={50} />);
    const progressBar = container.firstChild;
    const progressFill = progressBar?.firstChild;

    expect(progressBar).toHaveStyle({ width: "100%" });
    expect(progressFill).toHaveStyle({
      backgroundColor: "#7c3aed",
      width: "50%",
    });
  });

  it("사용자 지정 너비 테스트", () => {
    const { container } = render(<ProgressBar progress={70} width="200" />);
    const progressBar = container.firstChild;

    expect(progressBar).toHaveStyle({ width: "200px" });
  });

  it("사용자 지정 색상 테스트", () => {
    const { container } = render(<ProgressBar progress={30} color="#000000" />);
    const progressFill = container.firstChild?.firstChild;

    expect(progressFill).toHaveStyle({ backgroundColor: "#000000" });
  });

  it("동적 업데이트 테스트", () => {
    const { container, rerender } = render(<ProgressBar progress={30} />);
    const progressFill = container.firstChild?.firstChild;

    expect(progressFill).toHaveStyle({ width: "30%" });

    act(() => {
      rerender(<ProgressBar progress={60} />);
    });

    expect(progressFill).toHaveStyle({ width: "60%" });
  });

  it("클린업 테스트", () => {
    const cancelAnimationFrameSpy = jest.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<ProgressBar progress={50} />);

    unmount();

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
