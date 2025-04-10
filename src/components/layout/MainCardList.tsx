"use client";

import { usePathname } from "next/navigation";

import EmptyState from "@/app/mypage/_components/EmptyState";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseGatheringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { updateGatheringParams } from "@/utils/gatheringFilterParams";

import MainCardItem from "./MainCardItem";

interface IMainCardListProps {
  tab: string;
}

const MainCardList = ({ tab }: IMainCardListProps) => {
  const pathname = usePathname();
  const { searchParamsObj } = useCustomSearchParams();
  const params = updateGatheringParams(pathname, searchParamsObj);

  const { data, status, hasNextPage, fetchNextPage } =
    useSuspenseGatheringInfiniteList(tab, params);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  if (!data?.pages.length && !hasNextPage) {
    return <EmptyState message={EMPTY_MESSAGE.mypage.gatherings} />;
  }

  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-6">
      {data?.pages.map(page =>
        page.map(card => <MainCardItem key={card.id} gathering={card} />),
      )}
      {status === "error" ? (
        <div role="alert">{"에러가 발생했습니다."}</div>
      ) : (
        <div ref={setTarget}></div>
      )}
    </div>
  );
};

export default MainCardList;
