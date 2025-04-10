import Link from "next/link";

import MainTab from "@/components/navigations/MainTab";
import { ONLINE, ONLINE_PATH } from "@/constants/gatheringFilterParams";
import { MAIN_TAB } from "@/constants/ui";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";

interface IMainTabProps {
  pathname: string;
}

const GatheringMainTab = ({ pathname }: IMainTabProps) => {
  const { setSearchParams } = useCustomSearchParams();

  return (
    <div className="flex items-center gap-3">
      {MAIN_TAB.map((tab, i) => (
        <Link
          key={i}
          href={tab.href}
          aria-label={tab.name === "오프라인" ? "오프라인 탭" : "온라인 탭"}
          className="relative"
          onClick={() => pathname === ONLINE_PATH && setSearchParams(ONLINE)}
        >
          <MainTab active={pathname === tab.href} name={tab.name} />
        </Link>
      ))}
    </div>
  );
};

export default GatheringMainTab;
