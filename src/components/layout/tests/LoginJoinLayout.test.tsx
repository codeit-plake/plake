import { render, screen } from "@testing-library/react";

import LoginJoinLayout from "../LoginJoinLayout";

describe("LoginJoinLayout 컴포넌트 테스트", () => {
  describe("기본 렌더링 테스트", () => {
    it("LoginJoinLayout이 로그인 페이지로 렌더링된다.", () => {
      render(<LoginJoinLayout page="login" />);
      const loginTitle = screen.getByRole("heading", {
        name: /로그인/i,
      });
      expect(loginTitle).toBeInTheDocument();
    });
    it("LoginJoinLayout이 회원가입 페이지로 렌더링된다.", () => {
      render(<LoginJoinLayout page="join" />);
      const joinTitle = screen.getByRole("heading", {
        name: /회원가입/i,
      });
      expect(joinTitle).toBeInTheDocument();
    });
  });
});
