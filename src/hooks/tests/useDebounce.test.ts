import { act, renderHook } from "@testing-library/react";

import useDebounce from "../useDebounce";

describe("useDebounce 훅 테스트", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("지정된 지연 시간이 지나기 전까지는 콜백을 실행하지 않는다", () => {
    const callback = jest.fn();
    const delay = 1000;

    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    // 지연 시간의 일부만 진행
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("지정된 지연 시간이 지난 후 콜백을 실행한다", () => {
    const callback = jest.fn();
    const delay = 1000;

    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("여러 번 호출되었을 때 마지막 호출의 인자로 콜백이 실행된다", () => {
    const callback = jest.fn();
    const delay = 1000;

    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current("a");
      result.current("b");
      result.current("c");
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("컴포넌트 언마운트 시 타이머가 정리된다", () => {
    const callback = jest.fn();
    const delay = 1000;

    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount, result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
