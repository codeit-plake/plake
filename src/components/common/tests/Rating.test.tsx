import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Rating from "@/components/common/Rating";

describe("Rating 컴포넌트 테스트", () => {
  describe("기본 렌더링 테스트", () => {
    it("기본적으로 5개의 하트를 렌더링해야 함", () => {
      render(<Rating />);
      const hearts = screen.getAllByRole("button");
      expect(hearts).toHaveLength(5);
    });

    it("평점에 따라 채워진 하트의 개수가 달라져야 함", () => {
      const rating = 3;
      render(<Rating rating={rating} />);
      const hearts = screen.getAllByTestId("heart-icon");
      const filledHearts = hearts.filter(heart =>
        heart.classList.contains("text-purple-600"),
      );

      expect(filledHearts).toHaveLength(rating);
    });
  });

  describe("편집 가능한 상태(isEditable=true) 테스트", () => {
    it("편집 가능한 상태일 때 커서가 포인터여야 함", () => {
      render(<Rating isEditable />);
      const hearts = screen.getAllByRole("button");
      expect(hearts).toHaveLength(5);
      hearts.forEach(heart => {
        expect(heart).toHaveClass("cursor-pointer");
      });
    });

    it("편집 가능한 상태일 때 하트를 클릭하면 onRatingChange가 호출되어야 함", async () => {
      const mockOnRatingChange = jest.fn();
      render(<Rating isEditable onRatingChange={mockOnRatingChange} />);

      const hearts = screen.getAllByRole("button");
      await userEvent.click(hearts[2]);

      expect(mockOnRatingChange).toHaveBeenCalledWith(3);
    });
  });

  describe("편집 불가능한 상태(isEditable=false) 테스트", () => {
    it("편집 불가능한 상태일 때 커서가 default 상태여야 함", () => {
      render(<Rating isEditable={false} />);
      const hearts = screen.getAllByRole("button");
      expect(hearts).toHaveLength(5);
      hearts.forEach(heart => {
        expect(heart).toHaveClass("cursor-default");
      });
    });

    it("편집 불가능한 상태에서는 클릭해도 onRatingChange가 호출되지 않아야 함", async () => {
      const mockOnRatingChange = jest.fn();
      render(<Rating isEditable={false} onRatingChange={mockOnRatingChange} />);

      const hearts = screen.getAllByRole("button");
      await userEvent.click(hearts[2]);

      expect(mockOnRatingChange).not.toHaveBeenCalled();
    });
  });
});
