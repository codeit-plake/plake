"use client";

// Sentry 테스트용 코드 | 삭제될 예정
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import EmptyState from "@/app/mypage/_components/EmptyState";
import MyCardAction from "@/app/mypage/_components/my-card-item/MyCardAction";
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

  // Sentry 테스트용 코드 | 삭제될 예정
  const SentryTestTrigger = () => {
    useEffect(() => {
      if (process.env.NODE_ENV === "production") {
        alert("📡 Sentry 테스트 실행됨 (배포 환경)");
        Sentry.captureException(new Error("🧪 배포 환경 Sentry 테스트 에러"));
      }
    }, []);

    return null;
  };

  return (
    <>
      {/* Sentry 테스트용 코드 | 삭제될 예정 */}
      <SentryTestTrigger />
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
            <MyCardAction type={getButtonType(gathering)} id={gathering.id} />
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

export default MyCardList;
