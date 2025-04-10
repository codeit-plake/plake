import { fireEvent, render, screen } from "@testing-library/react";

import EditProfileModal from "@/components/modals/edit-profile-modal/EditProfileModal";
import { useUpdateUser as _useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";
import { mockUser } from "@/utils/test-utils/userMocking";

jest.mock("@/hooks/auth/useUpdateUser");

const mockHandleUpdateUser = jest.fn();
const mockOnCloseAlert = jest.fn();

beforeEach(() => {
  (_useUpdateUser as jest.Mock).mockReturnValue({
    handleUpdateUser: mockHandleUpdateUser,
    errorMessage: "에러가 발생했습니다.",
    isAlertOpen: false,
    onCloseAlert: mockOnCloseAlert,
  });
});

describe("EditProfileModal", () => {
  setupModalRoot();

  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    user: mockUser,
  };

  it("모달이 열리면 기본 사용자 정보가 렌더링된다.", () => {
    render(<EditProfileModal {...defaultProps} />);
    expect(screen.getByDisplayValue(mockUser.companyName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("수정하기")).toBeInTheDocument();
  });

  it("회사명을 변경할 수 있다.", () => {
    render(<EditProfileModal {...defaultProps} />);
    const input = screen.getByPlaceholderText("회사를 입력해주세요");
    fireEvent.change(input, { target: { value: "새로운 회사" } });
    expect(input).toHaveValue("새로운 회사");
  });

  it("수정 버튼 클릭 시 handleUpdateUser가 호출되고 onClose도 호출된다.", () => {
    render(<EditProfileModal {...defaultProps} />);
    fireEvent.click(screen.getByText("수정하기"));
    expect(mockHandleUpdateUser).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("취소 버튼 클릭 시 onClose가 호출된다.", () => {
    render(<EditProfileModal {...defaultProps} />);
    fireEvent.click(screen.getByText("취소"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("에러가 있을 경우 AlertModal이 표시된다.", () => {
    (_useUpdateUser as jest.Mock).mockReturnValue({
      handleUpdateUser: mockHandleUpdateUser,
      errorMessage: "에러가 발생했습니다.",
      isAlertOpen: true,
      onCloseAlert: mockOnCloseAlert,
    });

    render(<EditProfileModal {...defaultProps} />);
    expect(screen.getByText("에러가 발생했습니다.")).toBeInTheDocument();
  });

  it("회사명이 비어있을 경우 수정 버튼은 비활성화된다.", () => {
    render(
      <EditProfileModal
        {...defaultProps}
        user={{ ...defaultProps.user, companyName: "" }}
      />,
    );

    const submitButton = screen.getByText("수정하기");
    expect(submitButton).toBeDisabled();
  });
});
