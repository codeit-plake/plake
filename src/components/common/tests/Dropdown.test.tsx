import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import User from "@testing-library/user-event";

import Dropdown from "../Dropdown";

const mockOnChange = jest.fn();

describe("지역 필터 드롭다운 렌더링", () => {
  it("지역 필터 드롭다운 클릭시 옵션들이 렌더링된다.", async () => {
    render(<Dropdown onSelect={mockOnChange} />);

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toHaveTextContent(/지역 전체/i);

    await User.click(dropdown);

    expect(screen.getAllByRole("option")).toHaveLength(4);

    expect(screen.getByLabelText(/전체/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/건대입구/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/을지로3가/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/신림/i)).toBeInTheDocument();
  });
});

describe("지역 드롭다운의 옵션 요소 중", () => {
  it("전체를 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
    render(<Dropdown onSelect={mockOnChange} />);

    const dropdown = screen.getByRole("combobox");
    await User.click(dropdown);

    const total = screen.getByLabelText(/전체/i);
    await User.click(total);

    expect(dropdown).toHaveTextContent(/전체/i);
  });

  it("건대입구를 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
    render(<Dropdown onSelect={mockOnChange} />);

    const dropdown = screen.getByRole("combobox");
    await User.click(dropdown);

    const total = screen.getByLabelText(/건대입구/i);
    await User.click(total);

    expect(dropdown).toHaveTextContent(/건대입구/i);
  });

  it("을지로3가를 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
    render(<Dropdown onSelect={mockOnChange} />);

    const dropdown = screen.getByRole("combobox");
    await User.click(dropdown);

    const total = screen.getByLabelText(/을지로3가/i);
    await User.click(total);

    expect(dropdown).toHaveTextContent(/을지로3가/i);
  });

  it("신림을 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
    render(<Dropdown onSelect={mockOnChange} />);

    const dropdown = screen.getByRole("combobox");
    await User.click(dropdown);

    const total = screen.getByLabelText(/신림/i);
    await User.click(total);

    expect(dropdown).toHaveTextContent(/신림/i);
  });
});
