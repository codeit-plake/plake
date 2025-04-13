import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";

import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import authService from "@/services/auth/AuthService";
import { APIError } from "@/types/error";
import { mockUser } from "@/utils/test-utils/userMocking";

jest.mock("@/services/auth/AuthService", () => ({
  __esModule: true,
  default: {
    updateUser: jest.fn(),
  },
}));

const mockUpdateUserState = jest.fn();
const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();

jest.mock("@/stores/useUserStore", () => ({
  __esModule: true,
  default: () => ({
    user: { ...mockUser, teamId: mockUser.teamId },
    updateUserState: mockUpdateUserState,
  }),
}));

jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    isOpen: true,
    onOpen: mockOnOpen,
    onClose: mockOnClose,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useUpdateUser", () => {
  const mockFormData = new FormData();
  const updatedUser = { id: 123, name: "updated user" };

  it("성공적으로 유저 정보를 업데이트하면 updateUserState가 호출된다.", async () => {
    (authService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await act(async () => {
      result.current.handleUpdateUser(mockFormData);
    });

    expect(authService.updateUser).toHaveBeenCalledWith(mockFormData);
    expect(mockUpdateUserState).toHaveBeenCalledWith({
      ...updatedUser,
      teamId: mockUser.teamId,
    });
  });

  it("APIError가 발생하면 메시지를 세팅하고 모달을 연다.", async () => {
    const error = new APIError(
      "유효한 입력 값을 제공해야 합니다",
      "VALIDATION_ERROR",
      400,
    );
    (authService.updateUser as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await act(async () => {
      result.current.handleUpdateUser(mockFormData);
    });

    expect(result.current.errorMessage).toBe(
      "유효한 입력 값을 제공해야 합니다",
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  it("알 수 없는 에러가 발생하면 fallback 메시지를 세팅하고 모달을 연다.", async () => {
    (authService.updateUser as jest.Mock).mockRejectedValue("unknown error");

    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    await act(async () => {
      result.current.handleUpdateUser(mockFormData);
    });

    expect(result.current.errorMessage).toBe("알 수 없는 오류가 발생했어요.");
    expect(mockOnOpen).toHaveBeenCalled();
  });

  it("isAlertOpen과 onCloseAlert 상태를 반환한다.", () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    expect(result.current.isAlertOpen).toBe(true);
    expect(result.current.onCloseAlert).toBe(mockOnClose);
  });
});
