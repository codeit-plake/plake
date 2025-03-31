"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Dropdown from "@/components/common/Dropdown";
import FilterCalendar from "@/components/common/FilterCalendar";
import { OFFLINE_PATH } from "@/constants/gatheringFilterParams";
import { SORT_OPTION } from "@/constants/ui";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import useTabStore from "@/stores/useTabStore";

const GatheringFilterSort = () => {
  const isSubTabChange = useTabStore(state => state.isSubTabChange);
  const onSubTabChangeOff = useTabStore(state => state.onSubTabChangeOff);

  const [defaultValue, setDefaultValue] = useState<undefined | string>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const pathname = usePathname();
  const { setSearchParams } = useCustomSearchParams();

  useEffect(() => {
    // 서브탭 이동시 필터, 정렬 부분 초기화
    if (isSubTabChange) {
      onSubTabChangeOff();
      setSelectedDate(null);
      setDefaultValue("");
    }
  }, [isSubTabChange, onSubTabChangeOff]);

  return (
    <section className="mb-6 flex items-center justify-between gap-1">
      <div className="flex items-center justify-center gap-2">
        {pathname === OFFLINE_PATH && (
          <Dropdown
            onSelect={value => setSearchParams({ location: value })}
            defaultValue={defaultValue}
          />
        )}
        <FilterCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          disabledType={"afterToday"}
        />
      </div>
      <div>
        <Dropdown
          type="sort"
          placeholder="정렬"
          option={SORT_OPTION}
          onSelect={value => setSearchParams({ sortBy: value })}
          defaultValue={defaultValue}
        />
      </div>
    </section>
  );
};

export default GatheringFilterSort;
