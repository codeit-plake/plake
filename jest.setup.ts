import "@testing-library/jest-dom";

// Shadcn Select component를 열기 위해 필요한 mock
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();

beforeEach(() => {
  jest.restoreAllMocks(); // 테스트 전 원래 구현으로 스파이 복원
});

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
    getAll: jest.fn(() => []),
    forEach: jest.fn(),
    entries: jest.fn(() => []),
    keys: jest.fn(() => []),
    values: jest.fn(() => []),
    has: jest.fn(() => false),
  })),
}));

interface Cookie {
  name: string;
  value: string;
  [key: string]: unknown;
}

interface CookieStore {
  cookies: Record<string, Cookie>;
  set: (options: {
    name: string;
    value: string;
    [key: string]: unknown;
  }) => void;
  get: (name: string) => Cookie | undefined;
  delete: (name: string) => void;
  getAll: () => Cookie[];
}

const cookieStore: CookieStore = {
  cookies: {} as Record<string, { name: string; value: string }>,
  get: jest.fn((name: string) => {
    return cookieStore.cookies[name];
  }),
  getAll: jest.fn(() => {
    return Object.values(cookieStore.cookies);
  }),
  delete: jest.fn((name: string) => {
    delete cookieStore.cookies[name];
  }),
  set: jest.fn(({ name, value }) => {
    cookieStore.cookies[name] = { name, value };
  }),
};

const mockCookies = jest.fn(() => cookieStore);

jest.mock("next/headers", () => {
  return {
    cookies: mockCookies,
  };
});
jest.mock("@/stores/useUserStore", () => {
  const state = {
    user: null,
    isLoggedIn: false,
    isHydrated: false,
    clearUserState: jest.fn(() => {
      state.user = null;
      state.isLoggedIn = false;
      state.isHydrated = false;
    }),
    updateUserState: jest.fn(user => {
      state.user = user;
    }),
    setUserState: jest.fn(user => {
      state.user = user;
      state.isLoggedIn = true;
    }),
    setHydrated: jest.fn(isHydrated => {
      state.isHydrated = isHydrated;
    }),
  };

  const storeFunction = jest.fn(() => state);

  return {
    __esModule: true,
    default: Object.assign(storeFunction, {
      getState: () => state,
      setState: (newState: unknown) => Object.assign(state, newState),
    }),
    useShallow: jest.fn(fn => fn),
  };
});

jest.mock("@/stores/useSideBarStore", () => {
  const state = {
    isOpen: false,
    onToggleSideBar: jest.fn((flag: boolean) => {
      state.isOpen = flag;
    }),
  };

  const storeFunction = jest.fn(() => state);

  return {
    __esModule: true,
    default: Object.assign(storeFunction, {
      getState: () => state,
      setState: (newState: unknown) => Object.assign(state, newState),
      subscribe: jest.fn(),
    }),
    useShallow: jest.fn(selector => selector(state)),
  };
});

jest.mock("swiper/react", () => ({
  useSwiper: jest.fn(),
  Swiper: jest.fn(),
  SwiperSlide: jest.fn(),
  Navigation: jest.fn(),
  Pagination: jest.fn(),
  Scrollbar: jest.fn(),
  A11y: jest.fn(),
  Autoplay: jest.fn(),
  EffectFade: jest.fn(),
}));
