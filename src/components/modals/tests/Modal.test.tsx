import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "@/components/modals/Modal";
import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";

describe("Modal", () => {
  setupModalRoot();

  const onClose = jest.fn();

  const renderModal = (props = {}) =>
    render(
      <Modal isOpen={true} onClose={onClose} title="테스트 제목" {...props}>
        <p>내용</p>
      </Modal>,
    );

  beforeEach(() => {
    onClose.mockClear();
  });

  it("isOpen이 false일 때 렌더링되지 않는다.", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onClose}>
        <p>내용</p>
      </Modal>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("title과 children이 렌더링된다.", () => {
    renderModal();
    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose가 호출된다.", () => {
    renderModal();
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("배경 클릭 시 onClose가 호출된다.", () => {
    renderModal();
    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("ESC 키 입력 시 onClose가 호출된다.", () => {
    renderModal();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("title이 없을 경우 타이틀은 렌더링되지 않는다.", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>내용</p>
      </Modal>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("variant='alert'일 때도 정상 렌더링된다.", () => {
    renderModal({ variant: "alert" });
    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
  });

  it("variant='mobileFull'일 때도 정상 렌더링된다.", () => {
    renderModal({ variant: "mobileFull" });
    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
  });
});
