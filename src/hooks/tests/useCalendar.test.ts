import { renderHook } from "@testing-library/react";
import { act } from "react";

import { useCalendar } from "@/hooks/useCalendar";

describe("useCalendar 테스트", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-03-20"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("기본 날짜가 오늘로 설정되어야 함", () => {
    const { result } = renderHook(() => useCalendar());
    expect(result.current.selectedDate).toEqual(new Date("2024-03-20"));
  });

  it("defaultDate가 제공되면 해당 날짜로 설정되어야 함", () => {
    const customDate = new Date("2024-10-14");
    const { result } = renderHook(() =>
      useCalendar({ defaultDate: customDate }),
    );
    expect(result.current.selectedDate).toEqual(customDate);
  });

  it("날짜 선택이 제대로 동작해야 함", () => {
    const { result } = renderHook(() => useCalendar());
    const newDate = new Date("2024-10-14");

    act(() => {
      result.current.selectDate(newDate);
    });

    expect(result.current.selectedDate).toEqual(newDate);
  });

  it("clearDate가 호출되면 날짜가 초기화되어야 함", () => {
    const { result } = renderHook(() => useCalendar());
    const newDate = new Date("2024-10-14");

    act(() => {
      result.current.selectDate(newDate);
      result.current.clearDate();
    });

    expect(result.current.selectedDate).toEqual(new Date("2024-03-20"));
  });

  it("선택된 날짜를 가져올 수 있어야 함", () => {
    const { result } = renderHook(() => useCalendar());
    const newDate = new Date("2024-10-14");

    act(() => {
      result.current.selectDate(newDate);
    });

    expect(result.current.getSelectedDate()).toEqual(newDate);
  });

  it("기본적으로 오늘 이전의 날짜를 선택할 수 없어야 함", () => {
    const { result } = renderHook(() => useCalendar());

    expect(result.current.calendarProps.fromDate).toEqual(
      new Date("2024-03-20"),
    );
  });

  it("disabledAfterDate가 제공되면 해당 날짜 이후의 날짜를 선택할 수 없어야 함", () => {
    const disabledAfterDate = new Date("2024-10-14");
    const { result } = renderHook(() => useCalendar({ disabledAfterDate }));

    expect(result.current.calendarProps.fromDate).toEqual(
      new Date("2024-03-20"),
    );
    expect(result.current.calendarProps.toDate).toEqual(disabledAfterDate);
  });

  it("disabledAfterDate가 오늘이면 모든 날짜가 비활성화되어야 함", () => {
    const disabledAfterDate = new Date("2024-03-20");
    const { result } = renderHook(() => useCalendar({ disabledAfterDate }));

    expect(result.current.calendarProps.fromDate).toEqual(new Date(9999, 0, 1));
    expect(result.current.calendarProps.toDate).toEqual(new Date(0));
  });
});
