import { fireEvent, screen } from "@testing-library/react";

import MyCardCancelButton from "@/app/mypage/_components/my-card-item/actions/MyCardCancelButton";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";
import { useLeaveGatheringMutation as _useLeaveGatheringMutation } from "@/hooks/gathering/useLeaveGathering";
import { useModal } from "@/hooks/useModal";
import { renderWithClient } from "@/utils/test-utils/renderWithClient";

const mockMutate = jest.fn();
const mockModalHook = {
  isOpen: false,
  onClose: jest.fn(),
  onOpen: jest.fn(),
};

jest.mock("@/hooks/gathering/useLeaveGathering");
jest.mock("@/hooks/useModal", () => ({
  useModal: jest.fn(),
}));

describe("MyCardCancelButton", () => {
  beforeEach(() => {
    (_useLeaveGatheringMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    (useModal as jest.Mock).mockReturnValue(mockModalHook);
  });

  it("예약 취소하기 버튼이 렌더링된다.", () => {
    renderWithClient(<MyCardCancelButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.CANCEL);
    expect(button).toBeInTheDocument();
  });

  it("버튼 클릭 시 onOpen이 호출된다.", () => {
    renderWithClient(<MyCardCancelButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.CANCEL);
    fireEvent.click(button);
    expect(mockModalHook.onOpen).toHaveBeenCalled();
  });

  it("버튼 클릭 시 e.preventDefault()가 호출된다.", () => {
    renderWithClient(<MyCardCancelButton id={123} />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.CANCEL);
    const event = new MouseEvent("click", { bubbles: true });
    const prevent = jest.fn();
    button.dispatchEvent(Object.assign(event, { preventDefault: prevent }));

    expect(prevent).toHaveBeenCalled();
  });
});
