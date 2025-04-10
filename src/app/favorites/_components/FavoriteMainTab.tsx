import MainTab from "@/components/navigations/MainTab";
import { MAIN_TAB } from "@/constants/ui";
import useTabStore from "@/stores/useTabStore";

const GatheringMainTab = () => {
  const tabIdxs = useTabStore(state => state.tabIdxs);
  const setTabIdxs = useTabStore(state => state.setTabIdxs);

  const mainTabIdx = tabIdxs[0];

  return (
    <div className="flex items-center gap-3">
      {MAIN_TAB.map((tab, i) => (
        <button
          key={i}
          className="relative"
          onClick={() => setTabIdxs([i, 0])}
          aria-label="메인 주제 탭"
        >
          <MainTab active={mainTabIdx === i} name={tab.name} />
        </button>
      ))}
    </div>
  );
};

export default GatheringMainTab;
