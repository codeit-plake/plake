import { fireEvent, screen } from "@testing-library/react";

import MyCardWriteReviewButton from "@/app/mypage/_components/my-card-item/actions/MyCardWriteReviewButton";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";
import { useModal } from "@/hooks/useModal";
import { renderWithClient } from "@/utils/test-utils/renderWithClient";

const mockModalHook = {
  isOpen: false,
  onClose: jest.fn(),
  onOpen: jest.fn(),
};

jest.mock("@/hooks/useModal", () => ({
  useModal: jest.fn(),
}));

describe("MyCardWriteReviewButton", () => {
  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue(mockModalHook);
  });

  it("리뷰 작성하기 버튼이 렌더링된다.", () => {
    renderWithClient(<MyCardWriteReviewButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.WRITE_REVIEW);
    expect(button).toBeInTheDocument();
  });

  it("버튼 클릭 시 onOpen이 호출된다.", () => {
    renderWithClient(<MyCardWriteReviewButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.WRITE_REVIEW);
    fireEvent.click(button);
    expect(mockModalHook.onOpen).toHaveBeenCalled();
  });

  it("버튼 클릭 시 e.preventDefault()와 e.stopPropagation()이 호출된다.", () => {
    renderWithClient(<MyCardWriteReviewButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.WRITE_REVIEW);

    const event = new MouseEvent("click", { bubbles: true });
    const prevent = jest.fn();
    const stop = jest.fn();
    button.dispatchEvent(
      Object.assign(event, {
        preventDefault: prevent,
        stopPropagation: stop,
      }),
    );

    expect(prevent).toHaveBeenCalled();
    expect(stop).toHaveBeenCalled();
  });
});
