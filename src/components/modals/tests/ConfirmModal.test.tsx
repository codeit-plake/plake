import { fireEvent, render, screen } from "@testing-library/react";

import ConfirmModal from "@/components/modals/confirm-alert-modal/ConfirmModal";
import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";

describe("ConfirmModal 컴포넌트 테스트", () => {
  setupModalRoot();

  const mockTitle = "테스트 제목";
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const setup = () =>
    render(
      <ConfirmModal
        title={mockTitle}
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

  it("모달이 열리면 제목과 버튼이 렌더링 됨", () => {
    setup();

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 onConfirm이 호출됨", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("취소 버튼 클릭 시 onClose가 호출됨", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: "취소" }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
