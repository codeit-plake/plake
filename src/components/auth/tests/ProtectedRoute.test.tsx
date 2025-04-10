import "@testing-library/jest-dom";

import { act, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { checkAuthToken } from "@/hooks/auth/useCheckToken";
import useLogout from "@/hooks/auth/useLogout";
import { useModal } from "@/hooks/useModal";
import useUserStore from "@/stores/useUserStore";

import ProtectedRoute from "../ProtectedRoute";

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
        로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.
      </div>
    ) : null,
}));
describe("ProtectedRoute 컴포넌트", () => {
  const mockRouter = { replace: jest.fn() };
  const mockLogout = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useLogout as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useModal as jest.Mock).mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
    });
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
    });
    (checkAuthToken as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("컴포넌트 마운트 시 초기 토큰 검사를 수행한다", async () => {
    render(<ProtectedRoute />);
    await waitFor(() => expect(checkAuthToken).toHaveBeenCalledTimes(1));
  });

  it("10분마다 토큰 체크를 실행한다", async () => {
    render(<ProtectedRoute />);

    await waitFor(() => expect(checkAuthToken).toHaveBeenCalledTimes(1));

    act(() => {
      jest.advanceTimersByTime(600000); //
    });

    await waitFor(() => expect(checkAuthToken).toHaveBeenCalledTimes(2));
  });

  it("로그아웃 처리 함수가 올바르게 동작한다", async () => {
    (useModal as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
    });

    (checkAuthToken as jest.Mock).mockImplementationOnce(async callback => {
      callback();
      return false;
    });

    render(<ProtectedRoute />);

    await waitFor(() => {
      expect(mockOnOpen).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalled();
      expect(mockRouter.replace).toHaveBeenCalledWith("/login");
    });

    expect(screen.getByTestId("alert-modal")).toHaveTextContent(
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
    );
  });

  it("isLoggedIn이 false일 때 토큰 검사를 수행한다", async () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: false,
    });

    render(<ProtectedRoute />);

    await waitFor(() => expect(checkAuthToken).toHaveBeenCalledTimes(2));
  });

  it("컴포넌트 언마운트 시 인터벌을 정리한다", async () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(<ProtectedRoute />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
