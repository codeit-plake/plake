"use client";

/**
 * #P501 성능: Zustand 스토어 선택자 메모이제이션
 * #T501 타입: Zustand 스토어 타입 안정성 강화
 * #E601 에러: 데이터 로딩 실패 시 에러 처리
 */
import { useEffect, useState } from "react";

import MainCardItem from "@/components/layout/MainCardItem";
import { favoriteFilterKey } from "@/constants/favorite";
import { useSuspenseFavoriteList } from "@/hooks/gathering/useFavoriteList";
import useFavoriteStore from "@/stores/useFavoriteStore";
import useTabStore from "@/stores/useTabStore";
import { IGathering } from "@/types/gathering";

/**
 * #P502 성능: 필터링 로직 최적화
 * #A501 접근성: 필터링 및 정렬 컨트롤 접근성 개선
 * #U501 사용자 경험: 필터 변경 시 애니메이션 추가
 */
const FavoriteList = () => {
  /** #T502 타입: 스토어 상태 타입 명시적 정의 */
  const tabIdxs = useTabStore(state => state.tabIdxs);
  const favoriteList = useFavoriteStore(state => state.favoriteList);

  const [filter, setFilter] = useState<string>("");

  /**
   * #P503 성능: 데이터 페칭 및 캐싱 전략 최적화
   * #E602 에러: 데이터 로딩 상태 처리 개선
   */
  const { data: favoriteData } = useSuspenseFavoriteList(filter, {
    id: favoriteList,
  });

  /**
   * #P504 성능: 클라이언트 사이드 필터링 최적화
   * #E603 에러: 필터 상태 초기화 오류 처리
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFilter(favoriteFilterKey[tabIdxs.join("-")]);
    }
  }, [favoriteList, tabIdxs]);

  return (
    <>
      {/**
       * #A502 접근성: 리스트 구조 및 랜드마크 개선
       * #U502 사용자 경험: 로딩 및 빈 상태 UX 개선
       */}
      <div
        className="mb-8 flex flex-col items-center justify-center gap-6"
        role="region"
        aria-label="찜한 모임 목록"
      >
        {favoriteData &&
          favoriteData.map((card: IGathering) => (
            <MainCardItem key={card.id} gathering={card} />
          ))}
        {favoriteData?.length === 0 && (
          <p
            className="mt-28 text-gray-500"
            role="status"
            aria-label="찜한 모임 없음"
          >
            {"아직 찜한 모임이 없어요."}
          </p>
        )}
      </div>
    </>
  );
};

export default FavoriteList;
