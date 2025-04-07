import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FavoriteButton from "@/components/common/FavoriteButton";

describe("FavoriteButton", () => {
  it("찜하지 않은 상태일 때 빈 하트가 렌더링되고 aria-label이 '찜하기'로 설정된다", () => {
    render(<FavoriteButton isFavorite={false} onToggle={jest.fn()} />);
    const button = screen.getByRole("button", { name: /찜하기/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("찜한 상태일 때 채워진 하트가 렌더링되고 aria-label이 '찜 목록에서 제거하기'로 설정된다", () => {
    render(<FavoriteButton isFavorite={true} onToggle={jest.fn()} />);
    const button = screen.getByRole("button", {
      name: /찜 목록에서 제거하기/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("버튼 클릭 시 onToggle 핸들러가 호출된다", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(<FavoriteButton isFavorite={false} onToggle={onToggle} />);
    const button = screen.getByRole("button", { name: /찜하기/i });

    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
