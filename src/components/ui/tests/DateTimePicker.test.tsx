import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";

import DateTimePicker from "@/components/ui/DateTimePicker";

describe("DateTimePicker 컴포넌트 테스트", () => {
  const mockSetDateTimeValue = jest.fn();
  const mockSetRegistrationEndValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("렌더링 테스트", () => {
    it("기본값이 제대로 렌더링되어야 함", () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      expect(screen.getByText("날짜를 선택해주세요")).toBeInTheDocument();
    });

    it("초기값이 제공되면 해당 값으로 렌더링되어야 함", () => {
      const initialDateTime = "2024-03-20T12:00:00.000Z";
      const formattedDateTime =
        dayjs(initialDateTime).format("YYYY-MM-DD hh:mm A");

      render(
        <DateTimePicker
          type="dateTime"
          dateTimeValue={initialDateTime}
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      expect(screen.getByText(formattedDateTime)).toBeInTheDocument();
    });
  });

  describe("캘린더 상호작용 테스트", () => {
    it("dateTimePicker 클릭 시 캘린더가 열려야 함", async () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      fireEvent.click(screen.getByLabelText("모임 날짜 선택"));

      expect(
        screen.getByRole("dialog", { name: "date-time-picker" }),
      ).toBeInTheDocument();
    });

    it("외부 클릭 시 캘린더가 닫혀야 함", async () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      // 캘린더 열기
      fireEvent.click(screen.getByLabelText("모임 날짜 선택"));
      expect(
        screen.getByRole("dialog", { name: "date-time-picker" }),
      ).toBeInTheDocument();

      // 외부 클릭
      fireEvent.mouseDown(document.body);

      // 캘린더 닫힘
      await waitFor(() => {
        expect(
          screen.queryByRole("dialog", { name: "date-time-picker" }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("날짜 시간 선택 테스트", () => {
    it("날짜 선택 시 setDateTimeValue가 호출되어야 함", () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      fireEvent.click(screen.getByLabelText("모임 날짜 선택"));
      fireEvent.click(screen.getByText("21")); // 날짜 선택

      expect(mockSetDateTimeValue).toHaveBeenCalled();
      expect(mockSetDateTimeValue).toHaveBeenCalledTimes(1);
    });

    it("시간 선택 시 setDateTimeValue가 호출되어야 함", () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      fireEvent.click(screen.getByLabelText("모임 날짜 선택"));
      fireEvent.click(screen.getByLabelText("03시"));
      fireEvent.click(screen.getByLabelText("15분"));
      fireEvent.click(screen.getByLabelText("PM"));

      expect(mockSetDateTimeValue).toHaveBeenCalled();
      expect(mockSetDateTimeValue).toHaveBeenCalledTimes(3);
    });

    it("날짜/시간 선택 시 값이 제대로 설정되어야 함", () => {
      render(
        <DateTimePicker
          type="dateTime"
          setDateTimeValue={mockSetDateTimeValue}
        />,
      );

      fireEvent.click(screen.getByLabelText("모임 날짜 선택"));
      fireEvent.click(screen.getByText("21")); // 날짜 선택
      fireEvent.click(screen.getByLabelText("03시"));
      fireEvent.click(screen.getByLabelText("15분"));
      fireEvent.click(screen.getByLabelText("PM"));

      // 모든 선택 이후 최종 값 확인
      const lastCall =
        mockSetDateTimeValue.mock.calls[
          mockSetDateTimeValue.mock.calls.length - 1
        ][0];
      const selectedDateTime = dayjs(lastCall);

      expect(selectedDateTime.date()).toBe(21);
      expect(selectedDateTime.hour()).toBe(15);
      expect(selectedDateTime.minute()).toBe(15);
    });
  });

  describe("registrationEnd 타입 테스트", () => {
    it("registrationEnd 타입일 때 마감 날짜가 제대로 설정되어야 함", () => {
      const today = new Date();

      // 모임 날짜 설정
      const meetingDate = new Date(today);
      meetingDate.setDate(today.getDate() + 1);
      const initialDateTime = meetingDate.toISOString();

      render(
        <DateTimePicker
          type="registrationEnd"
          dateTimeValue={initialDateTime}
          setRegistrationEndValue={mockSetRegistrationEndValue}
        />,
      );

      // 캘린더 열기
      fireEvent.click(screen.getByLabelText("마감 날짜 선택"));

      // 그리드셀 내부의 실제 클릭 가능한 버튼 찾기
      const dateButtons = screen.getAllByRole("button").filter(button => {
        // 숫자 텍스트를 가진 버튼만 선택 (날짜 버튼)
        return /^\d+$/.test(button.textContent || "");
      });

      // 활성화된 버튼 찾기
      const activeButtons = dateButtons.filter(button => {
        // disabled 속성이 없고, 비활성화 클래스가 없는 버튼
        const isDisabled = button.hasAttribute("disabled");
        const isOutsideDay =
          button.classList.contains("day-outside") ||
          button.classList.contains("text-gray-400") ||
          button.closest('[class*="text-gray-400"]');
        return !isDisabled && !isOutsideDay;
      });

      // 활성화된 버튼이 있는지 확인
      expect(activeButtons.length).toBeGreaterThan(0);

      // 첫 번째 활성화된 버튼 클릭
      fireEvent.click(activeButtons[0]);

      expect(mockSetRegistrationEndValue).toHaveBeenCalled();
    });

    it("registrationEnd 타입일 때 모임 날짜 이후의 날짜만 선택 가능해야 함", () => {
      const initialDateTime = "2024-03-20T12:00:00.000Z";
      render(
        <DateTimePicker
          type="registrationEnd"
          dateTimeValue={initialDateTime}
          registrationEndValue={initialDateTime}
          setRegistrationEndValue={mockSetRegistrationEndValue}
        />,
      );

      fireEvent.click(screen.getByLabelText("마감 날짜 선택"));

      const pastDate = screen.getByText("19");
      expect(pastDate).toHaveClass("text-gray-400");

      fireEvent.click(pastDate);

      expect(mockSetRegistrationEndValue).not.toHaveBeenCalled();
    });
  });
});
