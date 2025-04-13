import { renderHook } from "@testing-library/react";

import { useScrollToTopOnValueChange } from "@/hooks/useScrollToTopOnValueChange";

describe("useScrollToTopOnValueChange 테스트", () => {
  beforeEach(() => {
    // window.scrollTo 모킹
    window.scrollTo = jest.fn();
  });

  it("value가 변경될 때 window.scrollTo가 호출되어야 함", () => {
    const { rerender } = renderHook(
      ({ value }) => useScrollToTopOnValueChange(value),
      { initialProps: { value: 1 } },
    );

    // 초기 렌더링 시
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });

    // value 변경 시
    rerender({ value: 2 });
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("value가 변경되지 않으면 window.scrollTo가 호출되지 않아야 함", () => {
    const { rerender } = renderHook(
      ({ value }) => useScrollToTopOnValueChange(value),
      { initialProps: { value: 1 } },
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // value 변경 시
    rerender({ value: 1 });
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("value가 undefined일 때도 window.scrollTo가 호출되어야 함", () => {
    renderHook(() => useScrollToTopOnValueChange(undefined));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
