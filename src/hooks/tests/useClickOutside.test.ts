import { renderHook } from "@testing-library/react";

import { useClickOutside } from "@/hooks/useClickOutside";

describe("useClickOutside 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockHandler = jest.fn();
  const mockRef = {
    current: document.createElement("div"),
  };

  it("요소 외부 클릭 시 핸들러가 호출되어야 함", () => {
    renderHook(() => useClickOutside(mockRef, mockHandler));

    // 요소 외부 클릭 이벤트 발생
    document.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockHandler).toHaveBeenCalledWith();
  });

  it("요소 내부 클릭 시 핸들러가 호출되지 않아야 함", () => {
    renderHook(() => useClickOutside(mockRef, mockHandler));

    // 요소 내부 클릭 이벤트 발생
    mockRef.current.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("touchstart 이벤트에도 동작해야 함", () => {
    renderHook(() => useClickOutside(mockRef, mockHandler));

    // 터치 이벤트 발생
    document.dispatchEvent(
      new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockHandler).toHaveBeenCalled();
  });

  it("unmount 시 이벤트 리스너가 제거되어야 함", () => {
    const { unmount } = renderHook(() => useClickOutside(mockRef, mockHandler));

    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );
  });
});
