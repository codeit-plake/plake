"use client";

import EmptyState from "@/app/mypage/_components/EmptyState";
import MyCardAction from "@/app/mypage/_components/my-card-item/MyCardAction";
import MyCardContent from "@/app/mypage/_components/my-card-item/MyCardContent";
import MyCardImage from "@/app/mypage/_components/my-card-item/MyCardImage";
import MyCardItem from "@/app/mypage/_components/my-card-item/MyCardItem";
import MyCardTitle from "@/app/mypage/_components/my-card-item/MyCardTitle";
import { EMPTY_MESSAGE } from "@/constants/emptyMessage";
import { useSuspenseMyGatheringList } from "@/hooks/gathering/useMyGatheringList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useMyCardActions from "@/hooks/useMyCardActions";

const MyReviewCardList = () => {
  const { getButtonProps } = useMyCardActions();

  const { data, hasNextPage, fetchNextPage, status } =
    useSuspenseMyGatheringList({ reviewed: "false", completed: "true" });

  const list = data.pages.flat() ?? [];

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  if (!list.length) {
    return <EmptyState message={EMPTY_MESSAGE.mypage.reviews} />;
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
            <MyCardAction action={getButtonProps(gathering)} />
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

export default MyReviewCardList;
