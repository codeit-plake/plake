import { fireEvent, render, screen } from "@testing-library/react";

import TimePicker from "../TimePicker";

describe("TimePicker 컴포넌트 테스트", () => {
  const mockSetValue = jest.fn();
  const mockSelectedDate = new Date("2024-03-20");

  describe("렌더링 테스트", () => {
    it("기본값이 제대로 렌더링되어야 함", () => {
      render(
        <TimePicker selectedDate={mockSelectedDate} setValue={mockSetValue} />,
      );

      expect(screen.getByLabelText("12시")).toMatchSnapshot();
      expect(screen.getByLabelText("00분")).toMatchSnapshot();
      expect(screen.getByLabelText("PM")).toMatchSnapshot();
    });

    it("초기값이 제공되면 해당 값으로 렌더링되어야 함", () => {
      const initialTime = "2024-03-20 02:30 AM";
      render(
        <TimePicker
          selectedDate={mockSelectedDate}
          setValue={mockSetValue}
          value={initialTime}
        />,
      );

      expect(screen.getByLabelText("02시")).toMatchSnapshot();
      expect(screen.getByLabelText("30분")).toMatchSnapshot();
      expect(screen.getByLabelText("AM")).toMatchSnapshot();
    });
  });

  describe("시간 선택 테스트", () => {
    it("시간 선택 시 setValue가 올바른 시간으로 호출되어야 함", () => {
      render(
        <TimePicker selectedDate={mockSelectedDate} setValue={mockSetValue} />,
      );

      fireEvent.click(screen.getByText("03"));
      fireEvent.click(screen.getByText("15"));
      fireEvent.click(screen.getByText("AM"));

      expect(mockSetValue).toHaveBeenCalledWith(
        new Date("2024-03-20 03:15:00"),
      );
    });

    it("PM 시간 선택 시 24시간 형식으로 변환되어야 함", () => {
      render(
        <TimePicker selectedDate={mockSelectedDate} setValue={mockSetValue} />,
      );

      fireEvent.click(screen.getByText("03"));
      fireEvent.click(screen.getByText("15"));
      fireEvent.click(screen.getByText("PM"));

      expect(mockSetValue).toHaveBeenCalledWith(
        new Date("2024-03-20 15:15:00"),
      );
    });

    it("12시 AM 선택 시 0시로 변환되어야 함", () => {
      render(
        <TimePicker selectedDate={mockSelectedDate} setValue={mockSetValue} />,
      );

      fireEvent.click(screen.getByText("12"));
      fireEvent.click(screen.getByText("00"));
      fireEvent.click(screen.getByText("AM"));

      expect(mockSetValue).toHaveBeenCalledWith(
        new Date("2024-03-20 00:00:00"),
      );
    });

    it("12시 PM 선택 시 12시로 유지되어야 함", () => {
      render(
        <TimePicker selectedDate={mockSelectedDate} setValue={mockSetValue} />,
      );

      fireEvent.click(screen.getByText("12"));
      fireEvent.click(screen.getByText("00"));
      fireEvent.click(screen.getByText("PM"));

      expect(mockSetValue).toHaveBeenCalledWith(
        new Date("2024-03-20 12:00:00"),
      );
    });
  });
});
