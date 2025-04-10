import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";

import DeadlineTag from "../DeadlineTag";

describe("모임이 마감되지 않은 경우(모집 종료일이 지나지 않은 경우) 렌더링 테스트", () => {
  //"2025-04-08 오후 5시"로 타이머 고정
  jest.useFakeTimers().setSystemTime(new Date("2025-04-08 17:00:00"));

  it("DeadlineTag가 보인다.", () => {
    const registrationEnd = dayjs("2025-05-08");
    render(<DeadlineTag registrationEnd={registrationEnd} />);

    expect(
      screen.getByLabelText("등록 마감까지 남은 시간"),
    ).toBeInTheDocument();
  });

  it("모집 종료 당일인 경우 마감되는 시간이 보인다.", () => {
    const registrationEnd = dayjs("2025-04-08T19:00:00");
    render(<DeadlineTag registrationEnd={registrationEnd} />);

    expect(screen.getByText("오늘 19시 마감")).toBeInTheDocument();
  });

  it("모집 종료 당일이 아닌 경우 마감까지 남은 일 수가 보인다.", () => {
    const registrationEnd = dayjs("2025-04-09T13:00:00");
    render(<DeadlineTag registrationEnd={registrationEnd} />);

    expect(screen.getByText("1일 후 마감")).toBeInTheDocument();
  });
});

describe("모임이 마감된 경우(모집 종료일이 지난 경우) 렌더링 테스트", () => {
  it("DeadlineTag가 보이지 않는다.", async () => {
    const registrationEnd = dayjs("2025-03-09T20:00:00");

    const { container } = render(
      <DeadlineTag registrationEnd={registrationEnd} />,
    );

    await waitFor(() => {
      expect(container.childElementCount).toEqual(0);
    });
  });
});
