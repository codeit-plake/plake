"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { OFFLINE_PATH, ONLINE_PATH } from "@/constants/gatheringFilterParams";
import { SUB_TAB } from "@/constants/ui";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { cn } from "@/lib/utils";
import useTabStore from "@/stores/useTabStore";

const SubTab = () => {
  const onSubTabChangeOn = useTabStore(state => state.onSubTabChangeOn);

  const pathname = usePathname();
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const type = searchParams.get("type") || "";
  const isOffline = pathname === OFFLINE_PATH;

  const href = pathname === OFFLINE_PATH ? OFFLINE_PATH : ONLINE_PATH;

  return (
    <div className="flex items-center gap-2">
      {SUB_TAB[isOffline ? "OFFLINE" : "ONLINE"].map((tab, i) => (
        <Link href={tab.value ? `?type=${tab.value}` : href} key={i}>
          <Button
            variant="default"
            aria-label="서브 주제 탭"
            onClick={() => {
              setSearchParams({ type: tab.value });
              onSubTabChangeOn();
            }}
            className={cn(
              "rounded-xl px-4 py-2.5",
              tab.value !== type &&
                "bg-gray-200 text-black hover:bg-gray-200/90",
            )}
          >
            {tab.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SubTab;
