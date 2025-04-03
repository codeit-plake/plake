"use client";

import { useSuspenseGatheringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { IGatheringFilterParams } from "@/types/gathering";

import MainCardItem from "./MainCardItem";

interface IMainCardListProps {
  tab: string;
  filteredParams: IGatheringFilterParams;
}

const MainCardList = ({ tab, filteredParams }: IMainCardListProps) => {
  const { data, status, hasNextPage, fetchNextPage } =
    useSuspenseGatheringInfiniteList(tab, filteredParams);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-6">
      {data?.pages.map((page, pageNum) =>
        page.map(card => (
          <MainCardItem
            key={card.id}
            id={String(card.id)}
            name={card.name}
            dateTime={new Date(card.dateTime)}
            registrationEnd={new Date(card.registrationEnd)}
            location={card.location}
            participantCount={card.participantCount}
            capacity={card.capacity}
            image={card.image}
            firstPage={pageNum === 0}
          />
        )),
      )}
      {status === "error" ? (
        <div>{"에러가 발생했습니다."}</div>
      ) : (
        <div ref={setTarget}></div>
      )}
    </div>
  );
};

export default MainCardList;
