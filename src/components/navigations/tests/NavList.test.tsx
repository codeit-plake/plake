import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useSideBarStore from "@/stores/useSideBarStore";
import { mockUserStore } from "@/utils/test-utils/userMocking";

import NavList from "../NavList";

describe("NavList 컴포넌트 테스트", () => {
  describe("기본 렌더링 테스트", () => {
    it("NavList가 정상적으로 렌더링된다.", () => {
      render(<NavList />);
      const navList = screen.getByRole("navigation");
      expect(navList).toBeInTheDocument();
    });

    it("NavList에 기본 링크가 포함되어 있다.", () => {
      render(<NavList />);
      const gatheringLink = screen.getByText(/모임 찾기/i);
      const favoriteLink = screen.getByText(/찜한 모임/i);
      const reviewLink = screen.getByText(/모든 리뷰/i);
      expect(gatheringLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
      expect(reviewLink).toBeInTheDocument();
    });
  });
  describe("상호작용 테스트", () => {
    it("모바일 메뉴의 로그아웃 버튼 클릭 시 로그아웃이 되고 사이드바가 닫힌다.", async () => {
      const userStore = mockUserStore.loggedIn();
      const mockStore = {
        isOpen: true,
        onToggleSideBar: jest.fn().mockImplementation(() => {
          mockStore.isOpen = !mockStore.isOpen;
        }),
      };

      (useSideBarStore as unknown as jest.Mock).mockReturnValue(mockStore);
      render(<NavList />);
      const user = userEvent.setup();

      const logoutButton = screen.getByLabelText("logout-button");
      expect(logoutButton).toBeInTheDocument();
      await user.click(logoutButton);

      expect(userStore.clearUserState).toHaveBeenCalled();
      expect(userStore.isLoggedIn).toBe(false);

      expect(mockStore.onToggleSideBar).toHaveBeenCalled();
      expect(mockStore.isOpen).toBe(false);
    });
  });
});
