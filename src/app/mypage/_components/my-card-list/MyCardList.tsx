"use client";

import EmptyState from "@/app/mypage/_components/EmptyState";
import MyCardActionGroup from "@/app/mypage/_components/my-card-item/actions/MyCardActionGroup";
import MyCardContent from "@/app/mypage/_components/my-card-item/MyCardContent";
import MyCardImage from "@/app/mypage/_components/my-card-item/MyCardImage";
import MyCardItem from "@/app/mypage/_components/my-card-item/MyCardItem";
import MyCardLabels from "@/app/mypage/_components/my-card-item/MyCardLabels";
import MyCardTitle from "@/app/mypage/_components/my-card-item/MyCardTitle";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseMyGatheringList } from "@/hooks/gathering/useMyGatheringList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getButtonType, getStatusProps } from "@/utils/myCardHelpers";

const MyCardList = () => {
  const { data, hasNextPage, fetchNextPage, status } =
    useSuspenseMyGatheringList();

  const list = data.pages.flat() ?? [];
  const filteredList = list.filter(gathering => gathering.canceledAt === null);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  if (!filteredList.length && !hasNextPage) {
    return <EmptyState message={EMPTY_MESSAGE.mypage.default} />;
  }

  return (
    <>
      {filteredList.map((gathering, index) => (
        <MyCardItem
          key={gathering.id}
          id={gathering.id}
          isLast={index === list.length - 1}
        >
          <MyCardImage image={gathering.image} name={gathering.name} />
          <MyCardContent hasAction={true}>
            <div>
              <MyCardLabels statuses={getStatusProps(gathering)} />
              <MyCardTitle
                hasLabel={true}
                name={gathering.name}
                location={gathering.location}
                dateTime={gathering.dateTime}
                participantCount={gathering.participantCount}
                capacity={gathering.capacity}
              />
            </div>
            <MyCardActionGroup
              type={getButtonType(gathering)}
              id={gathering.id}
            />
          </MyCardContent>
        </MyCardItem>
      ))}

      {status === "error" ? (
        <div role="alert">에러가 발생했습니다.</div>
      ) : (
        <div ref={setTarget}></div>
      )}
    </>
  );
};

export default MyCardList;
