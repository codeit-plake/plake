import "@testing-library/jest-dom";

import { act, render, screen, waitFor } from "@testing-library/react";

import TokenValidator from "@/components/auth/TokenValidator";
import { checkAuthToken } from "@/hooks/auth/useCheckToken";
import useLogout from "@/hooks/auth/useLogout";
import { useModal } from "@/hooks/useModal";
import useUserStore from "@/stores/useUserStore";

// 모듈 모킹
jest.mock("@/hooks/auth/useCheckToken", () => ({
  checkAuthToken: jest.fn(),
}));

jest.mock("@/hooks/auth/useLogout", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/hooks/useModal", () => ({
  useModal: jest.fn(),
}));

jest.mock("@/components/modals/confirm-alert-modal/AlertModal", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? (
      <div data-testid="alert-modal">
        로그인 유지시간이 만료됐습니다. 다시 로그인해주세요.
      </div>
    ) : null,
}));

describe("TokenValidator", () => {
  const mockLogout = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useLogout as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useModal as jest.Mock).mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue(false);
    (checkAuthToken as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("사용자가 로그인하지 않았을 때 인터벌이 설정되지 않는다.", () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue(false);
    const setIntervalSpy = jest.spyOn(global, "setInterval");

    render(<TokenValidator />);

    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it("사용자가 로그인했을 때 토큰 확인을 위한 인터벌이 설정된다.", () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue(true);
    const setIntervalSpy = jest.spyOn(global, "setInterval");

    render(<TokenValidator />);

    expect(setIntervalSpy).toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 600000);
  });

  it("컴포넌트 언마운트 시 인터벌이 정리된다.", () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue(true);
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(<TokenValidator />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("토큰 만료 시 올바르게 처리된다.", async () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue(true);

    (checkAuthToken as jest.Mock).mockImplementation(callback => {
      callback();
      return Promise.resolve();
    });

    render(<TokenValidator />);

    act(() => {
      jest.advanceTimersByTime(600000);
    });

    await waitFor(() => {
      expect(mockOnOpen).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("isOpen이 true일 때 알림 모달이 렌더링된다.", () => {
    (useModal as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
    });

    render(<TokenValidator />);

    const alertModal = screen.getByTestId("alert-modal");
    expect(alertModal).toBeInTheDocument();
    expect(alertModal.textContent).toBe(
      "로그인 유지시간이 만료됐습니다. 다시 로그인해주세요.",
    );
  });

  it("isOpen이 false일 때 알림 모달이 렌더링되지 않는다.", () => {
    (useModal as jest.Mock).mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
    });

    render(<TokenValidator />);

    const alertModal = screen.queryByTestId("alert-modal");
    expect(alertModal).not.toBeInTheDocument();
  });

  it("토큰 확인 함수가 지정된 간격으로 호출된다.", () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue(true);

    render(<TokenValidator />);

    expect(checkAuthToken).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(600000);
    });

    expect(checkAuthToken).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(600000);
    });

    expect(checkAuthToken).toHaveBeenCalledTimes(2);
  });
});
