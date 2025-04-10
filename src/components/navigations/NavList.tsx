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

const NavButtonForMobile = () => {
  const { onToggleSideBar } = useSideBarStore();
  const { isLoggedIn } = useUserStore(
    useShallow(state => ({ isLoggedIn: state.isLoggedIn })),
  );
  const { logout } = useLogout();

  return (
    <div className="mb-11 mt-4 flex items-center justify-between md:hidden">
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

interface INavItemProps {
  isActive: (href: string) => boolean;
}

const NavItem = ({ isActive }: INavItemProps) => {
  const { onToggleSideBar } = useSideBarStore();
  const { favoriteByUserLength } = useFavoriteLocalStorage();

  const favoriteLength = favoriteByUserLength(); // 찜한 모임 카운트 state

  return (
    <ul className="flex flex-col gap-6 font-semibold md:flex-row md:gap-10">
      {NAV_ITEMS.map(item => (
        <li key={item.href} className="relative">
          <Link
            onClick={() => onToggleSideBar(false)}
            href={item.href}
            className={cn(
              "transition-colors hover:text-purple-600",
              isActive(item.href)
                ? "font-bold text-purple-600"
                : "text-gray-700",
            )}
            aria-current={isActive(item.href) ? "page" : "false"}
          >
            {item.name}
          </Link>
          {item.href === "/favorites" && favoriteLength > 0 && (
            <span className="absolute ml-[1.5px] rounded-3xl bg-purple-300 px-[6px] py-0 text-xs font-bold text-white">
              {favoriteLength}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

interface INavListProps {
  activePath?: string; // 스토리북 환경에서 테스트하기 위한 path prop
}

const NavList = ({ activePath }: INavListProps) => {
  const pathname = usePathname();
  const currentPath = activePath || pathname;

  const isActive = (path: string): boolean => {
    return currentPath.split("/")[1].startsWith(path.split("/")[1]);
  };

  return (
    <nav>
      <NavButtonForMobile />
      <NavItem isActive={isActive} />
    </nav>
  );
};

export default NavList;
