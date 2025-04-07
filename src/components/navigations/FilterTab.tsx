"use client";

import { usePathname } from "next/navigation";

import MainTab from "@/components/navigations/MainTab";
import SubTab from "@/components/navigations/SubTab";

const FilterTab = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-6" aria-label="주제 탭">
      <MainTab pathname={pathname} />
      <SubTab pathname={pathname} />
    </section>
  );
};

export default FilterTab;
