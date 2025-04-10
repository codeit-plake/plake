import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { SUB_TAB } from "@/constants/ui";
import { cn } from "@/lib/utils";
import useTabStore from "@/stores/useTabStore";

const GatheringSubTab = () => {
  const tabIdxs = useTabStore(state => state.tabIdxs);
  const setTabIdxs = useTabStore(state => state.setTabIdxs);

  const mainTabIdx = tabIdxs[0];
  const subTabIdx = tabIdxs[1];

  const pathname = usePathname();
  const isOffline = mainTabIdx === 0;

  useEffect(() => {
    setTabIdxs([0, 0]); //다른 페이지로 이동시 탭 초기화
  }, [pathname, setTabIdxs]);

  return (
    <div className="flex items-center gap-2">
      {SUB_TAB[isOffline ? "OFFLINE" : "ONLINE"].map((tab, i) => (
        <Button
          key={i}
          variant="default"
          className={cn(
            "rounded-xl px-4 py-2.5",
            subTabIdx !== i && "bg-gray-200 text-black hover:bg-gray-200/90",
          )}
          aria-label={
            isOffline ? `오프라인 ${tab.name} 탭` : `온라인 ${tab.name} 탭`
          }
          onClick={() => setTabIdxs([mainTabIdx, i])}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
};

export default GatheringSubTab;
