import {
  calculateHalfHeart,
  calculateRatingValues,
  createRatingHandler,
  getBoundingRect,
  TOTAL_HEARTS,
} from "@/utils/rating";

describe("Rating Utilities Test", () => {
  describe("calculateRatingValues", () => {
    it("정수 평점에 대한 값을 올바르게 계산한다.", () => {
      const result = calculateRatingValues(4);
      expect(result).toEqual({
        fullHearts: 4,
        decimal: 0,
        hasPartialHeart: false,
        emptyHearts: 1,
      });
    });

    it("소수 평점에 대한 값을 올바르게 계산한다.", () => {
      const result = calculateRatingValues(3.5);
      expect(result).toEqual({
        fullHearts: 3,
        decimal: 0.5,
        hasPartialHeart: true,
        emptyHearts: 1,
      });
    });

    it("0점일 때 올바르게 처리한다.", () => {
      const result = calculateRatingValues(0);
      expect(result).toEqual({
        fullHearts: 0,
        decimal: 0,
        hasPartialHeart: false,
        emptyHearts: 5,
      });
    });

    it("5점일 때 올바르게 처리한다.", () => {
      const result = calculateRatingValues(5);
      expect(result).toEqual({
        fullHearts: 5,
        decimal: 0,
        hasPartialHeart: false,
        emptyHearts: 0,
      });
    });
  });

  describe("calculateHalfHeart", () => {
    it("왼쪽을 클릭하면 반 점수를 반환한다.", () => {
      const result = calculateHalfHeart(10, 100, 2);
      expect(result).toEqual(2.5);
    });

    it("오른쪽을 클릭하면 전체 점수를 반환한다.", () => {
      const result = calculateHalfHeart(60, 100, 2);
      expect(result).toEqual(3);
    });
  });

  describe("createRatingHandler", () => {
    it("편집 가능할 때 올바른 값으로 콜백을 호출한다.", () => {
      const mockRatingChange = jest.fn();
      const handler = createRatingHandler({
        onRatingChange: mockRatingChange,
        isEditable: true,
      });

      const mockEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            width: 100,
          }),
        },
        clientX: 60,
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      handler(mockEvent, 2);
      expect(mockRatingChange).toHaveBeenCalledWith(3);
    });

    it("편집 불가능할 때는 콜백을 호출하지 않는다.", () => {
      const mockOnRatingChange = jest.fn();
      const handler = createRatingHandler({
        onRatingChange: mockOnRatingChange,
        isEditable: false,
      });

      const mockEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            width: 100,
          }),
        },
        clientX: 75,
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      handler(mockEvent, 2);
      expect(mockOnRatingChange).not.toHaveBeenCalled();
    });
  });

  describe("getBoundingRect", () => {
    it("요소를 기준으로 한 x 좌표를 올바르게 계산한다.", () => {
      const mockEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 50,
            width: 100,
          }),
        },
        clientX: 75,
      } as unknown as React.MouseEvent<HTMLButtonElement>;

      const { x } = getBoundingRect(mockEvent);
      expect(x).toBe(25);
    });
  });

  describe("TOTAL_HEARTS 상수 테스트", () => {
    it("올바른 값(5)을 가진다.", () => {
      expect(TOTAL_HEARTS).toBe(5);
    });
  });
});
