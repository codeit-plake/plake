import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ImageUploader from "@/components/ui/ImageUploader";

describe("ImageUploader 컴포넌트 테스트", () => {
  const mockSetValue = jest.fn();

  it("기본값이 제대로 렌더링되어야 함", () => {
    render(<ImageUploader setValue={mockSetValue} />);

    expect(screen.getByText("이미지를 첨부해주세요.")).toBeInTheDocument();
    expect(screen.getByText("파일 찾기")).toBeInTheDocument();
  });

  it("파일 선택 시 setValue가 호출되어야 함", async () => {
    render(<ImageUploader setValue={mockSetValue} />);

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("이미지 업로드");

    await userEvent.upload(fileInput, file);

    expect(mockSetValue).toHaveBeenCalledWith(file);
  });

  it("파일 선택 시 파일명이 표시되어야 함", async () => {
    render(<ImageUploader setValue={mockSetValue} />);

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("이미지 업로드");

    await userEvent.upload(fileInput, file);

    expect(screen.getByText("test.png")).toBeInTheDocument();
  });

  it("파일 찾기 버튼 클릭 시 파일 입력 창이 열려야 함", () => {
    render(<ImageUploader setValue={mockSetValue} />);

    const mockClick = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "click", {
      configurable: true,
      value: mockClick,
    });

    const button = screen.getByText("파일 찾기");
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalled();
  });
});
