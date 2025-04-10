import useUserStore from "@/stores/useUserStore";
import { IUser } from "@/types/user";

type UserStore = {
  user: IUser | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  updateUserState?: (user: IUser) => void;
  setUserState?: (user: IUser) => void;
  clearUserState?: () => void;
  setHydrated?: (state: boolean) => void;
};

/**
// 로그인 상태 모킹 (기본값 사용)
mockUserStore.loggedIn();

// 로그인 상태 모킹 (커스텀 값으로 오버라이드)
mockUserStore.loggedIn({
  user: { name: "다른 이름" },
  isHydrated: false // 로그인 되었지만 로딩 중
});

// 로그아웃 상태 모킹
mockUserStore.loggedOut();

 */
export const mockUser = {
  teamId: 1,
  id: 1,
  name: "테스트 유저",
  email: "test@example.com",
  image: "/images/avatar.png",
  companyName: "코드잇",
  createdAt: "2025-04-03T09:52:19.610Z",
  updatedAt: "2025-04-03T09:52:19.610Z",
};

export const mockUserStore = {
  // 로그인된 사용자 상태 모킹
  loggedIn: (overrides = {}) => {
    const mockStore = {
      user: { ...mockUser },
      isLoggedIn: true,
      isHydrated: true,
      clearUserState: jest.fn().mockImplementation(() => {
        mockStore.isLoggedIn = false;
        mockStore.user = {
          teamId: 0,
          id: 0,
          name: "",
          email: "",
          image: "",
          companyName: "",
          createdAt: "",
          updatedAt: "",
        };
        (useUserStore as unknown as jest.Mock).mockReturnValue({
          ...mockStore,
        });
      }),
      ...overrides,
    };

    (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);
    return mockStore;
  },

  // 로그아웃된 상태 모킹
  loggedOut: (overrides = {}) => {
    const mockStore = {
      user: null,
      isLoggedIn: false,
      isHydrated: true,
      ...overrides,
    };

    (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);
    return mockStore;
  },
};

export const applyUserStoreSelectorMock = (store: UserStore) => {
  (useUserStore as unknown as jest.Mock).mockImplementation(selector =>
    typeof selector === "function" ? selector(store) : store,
  );
};
