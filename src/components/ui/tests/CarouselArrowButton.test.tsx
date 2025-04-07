import { fireEvent, render, screen } from "@testing-library/react";

import useCarouselEdge from "@/hooks/useCarouselEdge";

import CarouselArrowButton from "../CarouselArrowButton";

jest.mock("@/hooks/useCarouselEdge", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("CarouselArrowButton 테스트", () => {
  let mockSwiper: {
    slidePrev: jest.Mock;
    slideNext: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockSwiper = {
      slidePrev: jest.fn(),
      slideNext: jest.fn(),
    };
  });

  describe("렌더링 테스트", () => {
    it("prev 버튼이 올바르게 렌더링", () => {
      (useCarouselEdge as jest.Mock).mockReturnValue({
        isEdge: false,
        swiper: mockSwiper,
      });

      render(<CarouselArrowButton direction="prev" />);
      const button = screen.getByRole("button");
      const icon = screen.getByLabelText("prev-arrow");

      expect(button).toMatchSnapshot();
      expect(icon).toBeInTheDocument();
    });

    it("next 버튼이 올바르게 렌더링", () => {
      (useCarouselEdge as jest.Mock).mockReturnValue({
        isEdge: false,
        swiper: mockSwiper,
      });

      render(<CarouselArrowButton direction="next" />);
      const button = screen.getByRole("button");
      const icon = screen.getByLabelText("next-arrow");

      expect(button).toMatchSnapshot();
      expect(icon).toBeInTheDocument();
    });

    it("isEdge가 true일 때 버튼이 숨겨짐", () => {
      (useCarouselEdge as jest.Mock).mockReturnValue({
        isEdge: true,
        swiper: mockSwiper,
      });

      render(<CarouselArrowButton direction="prev" />);
      const button = screen.queryByRole("button");

      expect(button).toHaveClass("hidden");
    });
  });

  describe("이벤트 테스트", () => {
    it("prev 버튼 클릭 시 slidePrev 호출", () => {
      (useCarouselEdge as jest.Mock).mockReturnValue({
        isEdge: false,
        swiper: mockSwiper,
      });

      render(<CarouselArrowButton direction="prev" />);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      expect(mockSwiper.slidePrev).toHaveBeenCalled();
    });

    it("next 버튼 클릭 시 slideNext 호출", () => {
      (useCarouselEdge as jest.Mock).mockReturnValue({
        isEdge: false,
        swiper: mockSwiper,
      });

      render(<CarouselArrowButton direction="next" />);
      const button = screen.getByRole("button");

      fireEvent.click(button);
      expect(mockSwiper.slideNext).toHaveBeenCalled();
    });
  });
});
