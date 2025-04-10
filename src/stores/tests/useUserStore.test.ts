import { act } from "@testing-library/react";

import useUserStore from "@/stores/useUserStore";
import { mockUser } from "@/utils/test-utils/userMocking";

jest.unmock("@/stores/useUserStore");

describe("useUserStore 테스트", () => {
  beforeEach(() => {
    act(() => {
      useUserStore.getState().clearUserState();
    });
  });

  describe("초기 상태 테스트", () => {
    it("초기 상태는 user가 null이다", () => {
      const state = useUserStore.getState();
      expect(state.user).toBeNull();
    });

    it("초기 상태는 isLoggedIn이 false이다", () => {
      const state = useUserStore.getState();
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe("액션 함수 테스트", () => {
    it("updateUserState는 user만 업데이트한다", () => {
      act(() => {
        useUserStore.getState().updateUserState(mockUser);
      });

      const state = useUserStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isLoggedIn).toBe(false);
    });

    it("setUserState는 user와 isLoggedIn을 업데이트한다", () => {
      act(() => {
        useUserStore.getState().setUserState(mockUser);
      });

      const state = useUserStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isLoggedIn).toBe(true);
    });

    it("clearUserState는 user를 null로, isLoggedIn을 false로 설정한다", () => {
      act(() => {
        useUserStore.getState().setUserState(mockUser);
      });

      // 초기화
      act(() => {
        useUserStore.getState().clearUserState();
      });

      const state = useUserStore.getState();
      expect(state.user).toBeNull();
      expect(state.isLoggedIn).toBe(false);
    });

    it("setHydrated는 isHydrated 상태를 업데이트한다", () => {
      act(() => {
        useUserStore.getState().setHydrated(true);
      });

      expect(useUserStore.getState().isHydrated).toBe(true);

      act(() => {
        useUserStore.getState().setHydrated(false);
      });

      expect(useUserStore.getState().isHydrated).toBe(false);
    });
  });
});
