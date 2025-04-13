import { fireEvent, render, screen } from "@testing-library/react";

import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";

import AlertModal from "../confirm-alert-modal/AlertModal";

describe("AlertModal 컴포넌트 테스트", () => {
  setupModalRoot();

  const mockTitle = "테스트 제목";
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const setup = () => {
    render(
      <AlertModal
        title={mockTitle}
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
  };

  it("모달이 열리면 제목과 버튼이 렌더링 됨", () => {
    setup();

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 onConfirm과 onClose가 호출됨", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("onConfirm이 없을 경우에도 onClose는 호출됨", () => {
    render(
      <AlertModal title={mockTitle} isOpen={true} onClose={mockOnClose} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
