"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MYPAGE_NAV_ITEMS } from "@/constants/nav";
import { cn } from "@/lib/utils";

const NavTab = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3">
      {MYPAGE_NAV_ITEMS.map(tab => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative pb-1.5 text-lg font-semibold text-gray-400",
              isActive &&
                "text-black after:absolute after:mt-1.5 after:block after:w-full after:border-b-2 after:border-gray-900 after:content-['']",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavTab;
