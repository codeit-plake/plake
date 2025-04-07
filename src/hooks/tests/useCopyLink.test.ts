import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { act } from "react";

import useCopyLink from "@/hooks/useCopyLink";

const mockOpenAlert = jest.fn();
const mockPathname = "/test-path";

jest.mock("@/stores/useModalStore", () => ({
  __esModule: true,
  default: (selector: (state: { openAlert: jest.Mock }) => jest.Mock) => {
    const store = {
      openAlert: mockOpenAlert,
    };
    return selector(store);
  },
}));

describe("useCopyLink 테스트", () => {
  const originalClipboard = { ...navigator.clipboard };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    // navigator.clipboard 모킹
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    // 테스트 후 원래 상태로 복구
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
  });

  it("링크가 복사되고 성공 알림이 표시되어야 한다.", async () => {
    const { result } = renderHook(() => useCopyLink());

    await act(async () => {
      result.current.handleCopyLink();
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}${mockPathname}`,
    );
    expect(mockOpenAlert).toHaveBeenCalledWith("링크가 복사되었습니다.");
    expect(mockOpenAlert).toHaveBeenCalledTimes(1);
  });

  it("링크 복사에 실패하면 실패 알림이 표시되어야 한다.", async () => {
    // clipboard.writeText가 실패하도록 설정
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error("복사 실패"),
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderHook(() => useCopyLink());

    await act(async () => {
      result.current.handleCopyLink();
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(mockOpenAlert).toHaveBeenCalledWith(
      "링크 복사에 실패했습니다.\n다시 시도해주세요.",
    );
    expect(mockOpenAlert).toHaveBeenCalledTimes(1);
  });
});
