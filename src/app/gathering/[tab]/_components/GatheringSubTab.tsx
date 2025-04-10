import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { OFFLINE_PATH, ONLINE_PATH } from "@/constants/gatheringFilterParams";
import { SUB_TAB } from "@/constants/ui";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { cn } from "@/lib/utils";
import useTabStore from "@/stores/useTabStore";

interface ISubTabProps {
  pathname: string;
}

const GatheringSubTab = ({ pathname }: ISubTabProps) => {
  const onSubTabChangeOn = useTabStore(state => state.onSubTabChangeOn);

  const { searchParams, setSearchParams } = useCustomSearchParams();
  const type = searchParams.get("type") || "";

  const href = pathname === OFFLINE_PATH ? OFFLINE_PATH : ONLINE_PATH;
  const isOffline = pathname === OFFLINE_PATH;

  return (
    <div className="flex items-center gap-2">
      {SUB_TAB[isOffline ? "OFFLINE" : "ONLINE"].map((tab, i) => (
        <Link
          href={tab.visibleValue ? `?type=${tab.visibleValue}` : href}
          key={i}
        >
          <Button
            key={i}
            variant="default"
            className={cn(
              "rounded-xl px-4 py-2.5",
              tab.visibleValue !== type &&
                "bg-gray-200 text-black hover:bg-gray-200/90",
            )}
            aria-label={
              isOffline ? `오프라인 ${tab.name} 탭` : `온라인 ${tab.name} 탭`
            }
            onClick={() => {
              setSearchParams({ type: tab.visibleValue });
              onSubTabChangeOn();
            }}
          >
            {tab.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default GatheringSubTab;
