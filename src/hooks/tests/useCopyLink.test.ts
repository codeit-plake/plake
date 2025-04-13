import { act, renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";

import useCopyLink from "../useCopyLink";

describe("useCopyLink", () => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  const mockOrigin = "https://example.com";
  const mockPathname = "/gathering/123";

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    // window 객체 모킹
    Object.defineProperty(window, "location", {
      value: { origin: mockOrigin },
      writable: true,
    });
    Object.defineProperty(window.navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
    });
  });

  it("성공적으로 링크를 복사해야 함", async () => {
    const { result } = renderHook(() => useCopyLink());

    mockClipboard.writeText.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.handleCopyLink();
    });

    // clipboard.writeText가 올바른 URL로 호출되었는지 확인
    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      `${mockOrigin}${mockPathname}`,
    );
    // isCopyError가 false여야 함
    expect(result.current.isCopyError).toBe(false);
  });

  it("클립보드 복사 실패 시 에러를 설정해야 함", async () => {
    const { result } = renderHook(() => useCopyLink());
    const mockError = new Error("클립보드 복사 실패");

    mockClipboard.writeText.mockRejectedValueOnce(mockError);

    await act(async () => {
      await result.current.handleCopyLink();
    });

    // clipboard.writeText가 호출되었는지 확인
    expect(mockClipboard.writeText).toHaveBeenCalled();
    // isCopyError가 true여야 함
    expect(result.current.isCopyError).toBe(true);
  });

  it("일반 객체 에러를 Error 인스턴스로 변환해야 함", async () => {
    const { result } = renderHook(() => useCopyLink());
    const mockError = { message: "알 수 없는 오류" };

    mockClipboard.writeText.mockRejectedValueOnce(mockError);

    await act(async () => {
      await result.current.handleCopyLink();
    });

    // 에러 확인
    expect(result.current.isCopyError).toBe(true);
    expect(result.current.copyError?.message).toBe(
      "알 수 없는 오류가 발생했습니다",
    );
  });

  it("성공 후 에러 상태를 초기화해야 함", async () => {
    const { result } = renderHook(() => useCopyLink());

    // 에러 발생
    mockClipboard.writeText.mockRejectedValueOnce(new Error("초기 에러"));
    await act(async () => {
      await result.current.handleCopyLink();
    });
    expect(result.current.isCopyError).toBe(true);

    // 성공
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    await act(async () => {
      await result.current.handleCopyLink();
    });

    // 성공 이후 에러가 초기화되었는지 확인
    expect(result.current.isCopyError).toBe(false);
  });
});
