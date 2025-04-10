import { fireEvent, screen } from "@testing-library/react";

import MyCardViewReviewButton from "@/app/mypage/_components/my-card-item/actions/MyCardViewReviewButton";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";
import { renderWithClient } from "@/utils/test-utils/renderWithClient";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("MyCardViewReviewButton", () => {
  it("내가 쓴 리뷰 보기 버튼이 렌더링된다.", () => {
    renderWithClient(<MyCardViewReviewButton />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.VIEW_REVIEW);
    expect(button).toBeInTheDocument();
  });

  it("버튼 클릭 시 router.push가 호출된다.", () => {
    renderWithClient(<MyCardViewReviewButton />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.VIEW_REVIEW);
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/mypage/reviews?type=written");
  });

  it("버튼 클릭 시 e.preventDefault()가 호출된다.", () => {
    renderWithClient(<MyCardViewReviewButton />);
    const button = screen.getByText(MY_CARD_ACTION_TEXT.VIEW_REVIEW);

    const event = new MouseEvent("click", { bubbles: true });
    const prevent = jest.fn();
    button.dispatchEvent(Object.assign(event, { preventDefault: prevent }));

    expect(prevent).toHaveBeenCalled();
  });
});
