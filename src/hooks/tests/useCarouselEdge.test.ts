import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useSwiper } from "swiper/react";

import useCarouselEdge from "@/hooks/useCarouselEdge";

describe("useCarouselEdge 테스트", () => {
  const mockSwiper = {
    isBeginning: true,
    isEnd: false,
    on: jest.fn(),
    off: jest.fn(),
  };

  beforeEach(() => {
    (useSwiper as jest.Mock).mockReturnValue(mockSwiper);
  });

  it("prev 방향일 때 초기값이 true로 설정됨", () => {
    const { result } = renderHook(() => useCarouselEdge({ direction: "prev" }));
    expect(result.current.isEdge).toBe(true);
  });

  it("next 방향일 때 초기값이 false로 설정됨", () => {
    const { result } = renderHook(() => useCarouselEdge({ direction: "next" }));
    expect(result.current.isEdge).toBe(false);
  });

  it("슬라이드 상태에 따라 isEdge 상태가 올바르게 업데이트됨", () => {
    const { result, rerender } = renderHook(
      ({ direction }: { direction: "prev" | "next" }) =>
        useCarouselEdge({ direction }),
      {
        initialProps: { direction: "prev" },
      },
    );

    // prev 방향일 때 isBeginning이 true면 isEdge도 true
    mockSwiper.isBeginning = true;
    // 첫번째 이벤트 리스너 호출
    const updateEdgeStatus = mockSwiper.on.mock.calls[0][1];
    act(() => {
      updateEdgeStatus();
    });
    expect(result.current.isEdge).toBe(true);

    // prev 방향일 때 isBeginning이 false면 isEdge도 false
    mockSwiper.isBeginning = false;
    act(() => {
      updateEdgeStatus();
    });
    expect(result.current.isEdge).toBe(false);

    // next 방향으로 변경
    rerender({ direction: "next" });

    // next 방향일 때 isEnd가 true면 isEdge도 true
    mockSwiper.isEnd = true;
    // 세번째 이벤트 리스너 호출
    const nextUpdateEdgeStatus = mockSwiper.on.mock.calls[2][1];
    act(() => {
      nextUpdateEdgeStatus();
    });
    expect(result.current.isEdge).toBe(true);

    // next 방향일 때 isEnd가 false면 isEdge도 false
    mockSwiper.isEnd = false;
    act(() => {
      nextUpdateEdgeStatus();
    });
    expect(result.current.isEdge).toBe(false);
  });

  it("슬라이드 변경 이벤트 리스너가 등록됨", () => {
    renderHook(() => useCarouselEdge({ direction: "next" }));
    expect(mockSwiper.on).toHaveBeenCalledWith(
      "slideChange",
      expect.any(Function),
    );
  });

  it("snapGrid 변경 이벤트 리스너가 등록됨", () => {
    renderHook(() => useCarouselEdge({ direction: "next" }));
    expect(mockSwiper.on).toHaveBeenCalledWith(
      "snapGridLengthChange",
      expect.any(Function),
    );
  });

  it("언마운트 시 이벤트 리스너가 제거됨", () => {
    const { unmount } = renderHook(() =>
      useCarouselEdge({ direction: "next" }),
    );
    unmount();

    expect(mockSwiper.off).toHaveBeenCalledWith(
      "slideChange",
      expect.any(Function),
    );
    expect(mockSwiper.off).toHaveBeenCalledWith(
      "snapGridLengthChange",
      expect.any(Function),
    );
  });

  it("swiper 객체가 반환됨", () => {
    const { result } = renderHook(() => useCarouselEdge({ direction: "next" }));
    expect(result.current.swiper).toBe(mockSwiper);
  });
});
