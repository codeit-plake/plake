"use client";

import EmptyState from "@/app/mypage/_components/EmptyState";
import MyCardContent from "@/app/mypage/_components/my-card-item/MyCardContent";
import MyCardImage from "@/app/mypage/_components/my-card-item/MyCardImage";
import MyCardItem from "@/app/mypage/_components/my-card-item/MyCardItem";
import MyCardTitle from "@/app/mypage/_components/my-card-item/MyCardTitle";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseGatheringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface MyCreateCardListProps {
  userId: string;
}

const MyCreateCardList = ({ userId }: MyCreateCardListProps) => {
  const params = { createdBy: userId, sortOrder: "desc" };

  const { data, hasNextPage, fetchNextPage, status } =
    useSuspenseGatheringInfiniteList("all", params);

  const list = data.pages.flat() ?? [];
  const filteredList = list.filter(gathering => gathering.canceledAt === null);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  if (!filteredList.length && !hasNextPage) {
    return <EmptyState message={EMPTY_MESSAGE.mypage.gatherings} />;
  }

  return (
    <>
      {list.map((gathering, index) => (
        <MyCardItem
          key={gathering.id}
          id={gathering.id}
          isLast={index === list.length - 1}
        >
          <MyCardImage image={gathering.image} name={gathering.name} />
          <MyCardContent hasAction={true}>
            <MyCardTitle
              name={gathering.name}
              location={gathering.location}
              dateTime={gathering.dateTime}
              participantCount={gathering.participantCount}
              capacity={gathering.capacity}
            />
          </MyCardContent>
        </MyCardItem>
      ))}

      {status === "error" ? (
        <div>{"에러가 발생했습니다."}</div>
      ) : (
        <div ref={setTarget}></div>
      )}
    </>
  );
};

export default MyCreateCardList;
