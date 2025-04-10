import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ReviewTab from "@/app/mypage/_components/ReviewTab";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ReviewTab", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/mypage/reviews");
  });

  it("초기 상태가 'writable'일 때 작성 가능한 리뷰 탭이 활성화된다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<ReviewTab />);
    const writableBtn = screen.getByRole("tab", {
      name: "작성 가능한 리뷰",
    });
    expect(writableBtn).toHaveAttribute("aria-selected", "true");
  });

  it("초기 상태가 'written'이면 작성한 리뷰 탭이 활성화된다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "written",
    });

    render(<ReviewTab />);
    const writtenBtn = screen.getByRole("tab", {
      name: "작성한 리뷰",
    });
    expect(writtenBtn).toHaveAttribute("aria-selected", "true");
  });

  it("작성한 리뷰 탭 클릭 시 query param이 추가된 경로로 push 된다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<ReviewTab />);
    const writtenBtn = screen.getByRole("tab", {
      name: "작성한 리뷰",
    });
    fireEvent.click(writtenBtn);

    expect(mockPush).toHaveBeenCalledWith("/mypage/reviews?type=written", {
      scroll: false,
    });
  });

  it("작성 가능한 리뷰 탭 클릭 시 query param 없이 이동한다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "written",
    });

    render(<ReviewTab />);
    const writableBtn = screen.getByRole("tab", {
      name: "작성 가능한 리뷰",
    });
    fireEvent.click(writableBtn);

    expect(mockPush).toHaveBeenCalledWith("/mypage/reviews", {
      scroll: false,
    });
  });
});
