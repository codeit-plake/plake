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

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    getAll: jest.fn(() => []),
  })),
}));

jest.mock("@/stores/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    isLoggedIn: false,
    isHydrated: false,
  })),
  useShallow: jest.fn(fn => fn),
}));

jest.mock("@/stores/useSideBarStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isOpen: false,
  })),
  useShallow: jest.fn(fn => fn),
}));

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
