import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import User from "@testing-library/user-event";

import SortDropdown from "../SortDropdown";

const mockOnChange = jest.fn();

const options = [
  { value: "registrationEnd", label: "마감임박순" },
  { value: "participantCount", label: "인기순" },
];

describe("SortDropdown 컴포넌트 테스트", () => {
  render(<SortDropdown onSelect={mockOnChange} option={options} />);

  const dropdown = screen.getByRole("combobox");

  describe("정렬 드롭다운 렌더링", () => {
    it("정렬 드롭다운이 렌더링된다.", async () => {
      expect(dropdown).toBeInTheDocument();
    });

    it("정렬 드롭다운을 클릭시 옵션들이 렌더링된다.", async () => {
      render(<SortDropdown onSelect={mockOnChange} option={options} />);

      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toHaveTextContent(/정렬/i);

      await User.click(dropdown);

      expect(screen.getAllByRole("option")).toHaveLength(3); //기본적으로 렌더링되는 '전체' Option을 포함해 총 3개의 options가 렌더링되어야 함.

      expect(screen.getByLabelText(/전체/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/마감임박순/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/인기순/i)).toBeInTheDocument();
    });
  });

  describe("정렬 드롭다운의 옵션 요소 중", () => {
    it("전체를 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
      render(<SortDropdown onSelect={mockOnChange} option={options} />);

      const dropdown = screen.getByRole("combobox");
      await User.click(dropdown);

      const total = screen.getByLabelText(/전체/i);
      await User.click(total);

      expect(dropdown).toHaveTextContent(/전체/i);
    });

    it("인기순을 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
      render(<SortDropdown onSelect={mockOnChange} option={options} />);

      const dropdown = screen.getByRole("combobox");
      await User.click(dropdown);

      const total = screen.getByLabelText(/인기순/i);
      await User.click(total);

      expect(dropdown).toHaveTextContent(/인기순/i);
    });

    it("마감임박순을 클릭하면 placeholder에 선택한 옵션 텍스트가 렌더링된다.", async () => {
      render(<SortDropdown onSelect={mockOnChange} option={options} />);

      const dropdown = screen.getByRole("combobox");
      await User.click(dropdown);

      const total = screen.getByLabelText(/마감임박순/i);
      await User.click(total);

      expect(dropdown).toHaveTextContent(/마감임박순/i);
    });
  });
});
