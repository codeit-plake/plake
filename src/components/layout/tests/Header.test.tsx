import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNavigation from "next/navigation";

import { mockUserStore } from "@/utils/test-utils/userMocking";

import Header from "../Header";

describe("Header 컴포넌트 테스트", () => {
  beforeEach(() => {
    // 각 테스트 전에 기본 pathname 설정
    jest.spyOn(nextNavigation, "usePathname").mockReturnValue("/");
  });

  describe("기본 렌더링 테스트", () => {
    it("Header가 정상적으로 렌더링된다.", () => {
      // 기본 상태 사용 (로그아웃 상태)
      mockUserStore.loggedOut();
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });

    it("로고 이미지가 정상적으로 렌더링된다.", () => {
      render(<Header />);
      const logo = screen.getByAltText("logo-image");
      expect(logo).toBeInTheDocument();
    });

    it("다른 경로에서도 Header가 정상적으로 렌더링된다.", () => {
      jest.spyOn(nextNavigation, "usePathname").mockReturnValue("/all-reviews");
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("비로그인시 로그인버튼이 렌더링된다.", () => {
      mockUserStore.loggedOut();
      render(<Header />);
      const loginButton = screen.getByRole("link", { name: /로그인/i });
      expect(loginButton).toBeInTheDocument();
    });

    it("로그인시 프로필 아바타가 렌더링된다.", () => {
      // 로그인 상태로 모킹 설정
      mockUserStore.loggedIn();
      render(<Header />);

      const profileAvatar = screen.getByLabelText("avatar-default");
      expect(profileAvatar).toBeInTheDocument();
    });
  });

  describe("상호작용 테스트", () => {
    it("로고를 클릭하면 홈으로 이동한다.", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const logo = screen.getByAltText("logo-image");
      await user.click(logo);

      expect(nextNavigation.usePathname()).toBe("/");
    });

    it("아바타를 클릭하면 팝업메뉴가 나타난다.", async () => {
      mockUserStore.loggedIn();
      const user = userEvent.setup();
      render(<Header />);

      const profileAvatar = screen.getByLabelText("avatar-default");
      await user.click(profileAvatar);

      const popoverMenu = screen.getByRole("dialog");
      expect(popoverMenu).toHaveAttribute("data-state", "open");
    });

    it("로그인 후 로그아웃을 클릭하면 다시 로그인 버튼이 나타난다.", async () => {
      const mockStore = mockUserStore.loggedIn();

      const user = userEvent.setup();
      const { rerender } = render(<Header />);

      const profileAvatar = screen.getByLabelText("avatar-default");
      await user.click(profileAvatar);

      const popoverMenu = screen.getByRole("dialog");
      expect(popoverMenu).toHaveAttribute("data-state", "open");

      const logoutButton = await screen.findAllByText("로그아웃");
      await user.click(logoutButton[1]);

      expect(mockStore.clearUserState).toHaveBeenCalled();

      rerender(<Header />);

      await waitFor(() => {
        const loginButton = screen.getByRole("link", { name: /로그인/i });
        expect(loginButton).toBeInTheDocument();
      });
    });
  });
});
