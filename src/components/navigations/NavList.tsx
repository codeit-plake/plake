/**
 * #P801 성능: 네비게이션 상태 관리 최적화
 * #T801 타입: Zustand 스토어 타입 안정성 강화
 * #A801 접근성: 네비게이션 구조 및 키보드 탐색 개선
 */
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";

import { NAV_BUTTONS, NAV_ITEMS } from "@/constants/nav";
import useLogout from "@/hooks/auth/useLogout";
import useFavoriteLocalStorage from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import useSideBarStore from "@/stores/useSideBarStore";
import useUserStore from "@/stores/useUserStore";

import { Button } from "../ui/Button";

/**
 * #A802 접근성: 모바일 버튼 접근성 개선
 * #U801 사용자 경험: 반응형 전환 애니메이션 추가
 * #E901 에러: 로그아웃 실패 처리
 */
const NavButtonForMobile = () => {
  const { onToggleSideBar } = useSideBarStore();
  const { isLoggedIn } = useUserStore(
    useShallow(state => ({ isLoggedIn: state.isLoggedIn })),
  );
  const { logout } = useLogout();

  return (
    <div
      className="mb-11 mt-4 flex items-center justify-between md:hidden"
      role="navigation"
      aria-label="모바일 메뉴"
    >
      {NAV_BUTTONS.filter(button => isLoggedIn === button.loggedInShow).map(
        button => (
          <Button
            key={button.href}
            size="sm"
            className={clsx("w-20", {
              "border-2": button.variant === "purple-outline",
            })}
            onClick={() => {
              onToggleSideBar(false);
              if (button.name === "로그아웃") logout();
            }}
            variant={button.variant}
            asChild
            aria-label={button.ariaLabel}
          >
            <Link href={button.href}>{button.name}</Link>
          </Button>
        ),
      )}
    </div>
  );
};

/**
 * #T802 타입: props 인터페이스 문서화
 * #T803 타입: 활성화 상태 타입 강화
 */
interface INavItemProps {
  isActive: (href: string) => boolean;
}

/**
 * #P802 성능: 리렌더링 최적화
 * #A803 접근성: 네비게이션 아이템 접근성 강화
 * #U802 사용자 경험: 활성화 상태 전환 효과
 */
const NavItem = ({ isActive }: INavItemProps) => {
  const { onToggleSideBar } = useSideBarStore();
  const { favoriteByUserLength } = useFavoriteLocalStorage();

  const favoriteLength = favoriteByUserLength(); // 찜한 모임 카운트 state

  return (
    <ul
      className="flex flex-col gap-6 font-semibold md:flex-row md:gap-10"
      role="menubar"
    >
      {NAV_ITEMS.map(item => (
        <li key={item.href} className="relative" role="none">
          <Link
            onClick={() => onToggleSideBar(false)}
            href={item.href}
            className={cn(
              "transition-colors hover:text-purple-600",
              isActive(item.href)
                ? "font-bold text-purple-600"
                : "text-gray-700",
            )}
            role="menuitem"
            aria-current={isActive(item.href) ? "page" : "false"}
          >
            {item.name}
          </Link>
          {item.href === "/favorites" && favoriteLength > 0 && (
            <span
              className="absolute ml-[1.5px] rounded-3xl bg-purple-300 px-[6px] py-0 text-xs font-bold text-white"
              role="status"
              aria-label={`찜한 모임 ${favoriteLength}개`}
            >
              {favoriteLength}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

/**
 * #T804 타입: props 인터페이스 문서화
 * #E902 에러: 잘못된 경로 처리
 */
interface INavListProps {
  activePath?: string; // 스토리북 환경에서 테스트하기 위한 path prop
}

/**
 * #P803 성능: 경로 비교 로직 최적화
 * #A804 접근성: 전체 네비게이션 구조 개선
 * #U803 사용자 경험: 네비게이션 상태 피드백
 */
const NavList = ({ activePath }: INavListProps) => {
  const pathname = usePathname();
  const currentPath = activePath || pathname;

  const isActive = (path: string): boolean => {
    return currentPath.split("/")[1].startsWith(path.split("/")[1]);
  };

  return (
    <nav aria-label="메인 메뉴">
      <NavButtonForMobile />
      <NavItem isActive={isActive} />
    </nav>
  );
};

export default NavList;
