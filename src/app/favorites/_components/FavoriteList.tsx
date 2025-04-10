"use client";

import { useEffect, useState } from "react";

import MainCardItem from "@/components/layout/MainCardItem";
import { favoriteFilterKey } from "@/constants/favorite";
import { useSuspenseFavoriteList } from "@/hooks/gathering/useFavoriteList";
import useFavoriteStore from "@/stores/useFavoriteStore";
import useTabStore from "@/stores/useTabStore";
import { IGathering } from "@/types/gathering";

const FavoriteList = () => {
  const tabIdxs = useTabStore(state => state.tabIdxs);
  const favoriteList = useFavoriteStore(state => state.favoriteList);

  const [filter, setFilter] = useState<string>("");

  const { data: favoriteData } = useSuspenseFavoriteList(filter, {
    id: favoriteList,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFilter(favoriteFilterKey[tabIdxs.join("-")]);
    }
  }, [favoriteList, tabIdxs]);

  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center gap-6">
        {favoriteData &&
          favoriteData.map((card: IGathering) => (
            <MainCardItem key={card.id} gathering={card} />
          ))}
        {favoriteData?.length === 0 && (
          <p className="mt-28 text-gray-500">{"아직 찜한 모임이 없어요."}</p>
        )}
      </div>
    </>
  );
};

export default FavoriteList;
