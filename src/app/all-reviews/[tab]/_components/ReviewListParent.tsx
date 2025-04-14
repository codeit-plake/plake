"use client";

/**
 * #P401 성능: 무한 스크롤 최적화 및 가상화 도입 검토
 * #T401 타입: URL 파라미터 타입 안정성 강화
 * #E501 에러: 데이터 페칭 실패 시 재시도 로직 추가
 */
import { useParams, useSearchParams } from "next/navigation";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import ReviewCardList from "@/components/layout/ReviewCardList";
import { SERVICE_LIST } from "@/constants/gathering";
import { useSuspenseReviewList } from "@/hooks/review/useReviewList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { TReviewQueryParams } from "@/types/review";

/**
 * #P402 성능: 검색 파라미터 변경 시 불필요한 리렌더링 방지
 * #A401 접근성: 리뷰 목록 탐색 및 필터링 접근성 개선
 * #U401 사용자 경험: 스크롤 위치 복원 기능 추가
 */
const ReviewListParent = () => {
  const { tab } = useParams();
  const searchParams = useSearchParams();
  const online = SERVICE_LIST.ONLINE;
  const isOnline = tab === online.value;

  /** #T402 타입: 검색 파라미터 타입 검증 및 기본값 처리 */
  const type = isOnline ? online.type : searchParams.get("type");
  let location;
  if (searchParams.get("location") !== "전체") {
    location = isOnline ? online.location : searchParams.get("location");
  } else {
    location = "";
  }
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  /** #T403 타입: 쿼리 파라미터 타입 안정성 강화 */
  const reviewQueryParams: TReviewQueryParams = {
    ...(type && { type }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(location && { location }),
    ...(date && { date }),
  };

  /**
   * #P403 성능: 데이터 캐싱 및 프리페칭 전략 수립
   * #E502 에러: 데이터 로딩 상태 처리 개선
   */
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseReviewList(!isOnline, reviewQueryParams);

  const flatData = data?.pages.flatMap(page => page.data);

  /**
   * #P404 성능: Intersection Observer 콜백 최적화
   * #U402 사용자 경험: 스크롤 로딩 UX 개선
   */
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <>
      {/**
       * #A402 접근성: 리뷰 목록 랜드마크 및 헤딩 구조 개선
       * #U403 사용자 경험: 로딩 상태 스켈레톤 UI 적용
       */}
      {flatData.length > 0 ? (
        <>
          <ReviewCardList reviews={flatData} />
          <div ref={setTarget} className="h-10 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center p-4">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="flex min-h-40 w-full items-center justify-center"
          role="status"
          aria-label="리뷰 없음"
        >
          <p className="text-sm font-medium text-gray-500">
            아직 리뷰가 없어요
          </p>
        </div>
      )}
    </>
  );
};

export default ReviewListParent;
