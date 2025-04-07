import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "../Input";

describe("Input 컴포넌트 테스트", () => {
  describe("기본 렌더링 테스트", () => {
    it("Input이 정상적으로 렌더링된다.", () => {
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
        />,
      );
      const input = screen.getByPlaceholderText("테스트 플레이스홀더");
      expect(input).toBeInTheDocument();
    });

    it("Label이 정상적으로 렌더링된다.", () => {
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
        />,
      );
      const label = screen.getByText("테스트 라벨");
      expect(label).toBeInTheDocument();
    });
  });

  describe("상태 테스트", () => {
    it("disabled 상태에서 Input이 비활성화된다.", () => {
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
          disabled
        />,
      );
      const input = screen.getByPlaceholderText("테스트 플레이스홀더");
      expect(input).toBeDisabled();
    });

    it("required 상태에서 Input이 필수로 설정된다.", () => {
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
          required
        />,
      );
      const input = screen.getByPlaceholderText("테스트 플레이스홀더");
      expect(input).toHaveAttribute("required");
    });

    it("error 상태에서 Input이 에러 메시지를 표시한다.", () => {
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
          errorMsg="에러 메시지입니다."
        />,
      );
      const errorMsg = screen.getByText("에러 메시지입니다.");
      expect(errorMsg).toBeInTheDocument();
    });
  });

  describe("상호작용 테스트", () => {
    it("onChange 이벤트가 정상적으로 작동한다.", async () => {
      const handleChange = jest.fn();
      render(
        <Input
          type="text"
          id="test-input"
          label="테스트 라벨"
          placeholder="테스트 플레이스홀더"
          onChange={handleChange}
        />,
      );
      const input = screen.getByPlaceholderText("테스트 플레이스홀더");
      await userEvent.type(input, "테스트 입력");
      expect(input).toHaveValue("테스트 입력");
    });

    it("비밀번호 입력 시 비밀번호 표시/숨기기 기능이 동작한다.", async () => {
      render(
        <Input
          type="password"
          id="test-input"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
        />,
      );
      const input = screen.getByPlaceholderText("비밀번호를 입력하세요");
      const toggleButton = screen.getByRole("button");
      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute("type", "text");
      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute("type", "password");
    });

    it("비밀번호 입력 시 비밀번호 표시/숨기기 버튼이 렌더링된다.", () => {
      render(
        <Input
          type="password"
          id="test-input"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
        />,
      );
      const toggleButton = screen.getByRole("button");
      expect(toggleButton).toBeInTheDocument();
    });

    it("비밀번호 입력 시 비밀번호 표시/숨기기 버튼이 클릭 가능하다.", async () => {
      render(
        <Input
          type="password"
          id="test-input"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
        />,
      );
      const toggleButton = screen.getByRole("button");
      await userEvent.click(toggleButton);
      expect(toggleButton).toBeEnabled();
    });
  });
});
