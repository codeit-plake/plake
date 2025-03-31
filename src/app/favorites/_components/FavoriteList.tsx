"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import MainCardItem from "@/components/layout/MainCardItem";
import { favoriteFilterKey, IFavorite } from "@/constants/favorite";
import { useSuspenseFavoriteList } from "@/hooks/gathering/useFavoriteList";
import useFavoriteStore from "@/stores/useFavoriteStore";
import useTabStore from "@/stores/useTabStore";
import useUserStore from "@/stores/useUserStore";
import { IGathering } from "@/types/gathering";

const FavoriteList = () => {
  const user = useUserStore(state => state.user);
  const tabIdxs = useTabStore(state => state.tabIdxs);
  const { favorite } = useFavoriteStore(
    useShallow(state => ({ favorite: state.favorite })),
  );

  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const email = user?.email || "unknown";

  const { data: favoriteData } = useSuspenseFavoriteList(filter, {
    id: favoriteList,
  });

  useEffect(() => {
    const data: IFavorite = Object.assign({ default: [] }, favorite);

    const idsByUser = data?.[email];
    if (idsByUser) setFavoriteList(idsByUser);

    setFilter(favoriteFilterKey[tabIdxs.join("-")]);
  }, [tabIdxs, email, favorite]);

  useEffect(() => {
    setFilter("OFFLINE");
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center gap-6">
        {favoriteData &&
          favoriteData.map((card: IGathering) => (
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
              firstPage={false}
            />
          ))}
        {favoriteData?.length === 0 && <div>찜한 모임이 없습니다.</div>}
      </div>
    </>
  );
};

export default FavoriteList;
