"use client";

import { usePathname } from "next/navigation";

import GatheringMainTab from "../_components/GatheringMainTab";
import GatheringSubTab from "../_components/GatheringSubTab";

const FilterTab = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-6" aria-label="주제 탭">
      <GatheringMainTab pathname={pathname} />
      <GatheringSubTab pathname={pathname} />
    </section>
  );
};

export default FilterTab;
