"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import MainCardItem from "@/components/layout/MainCardItem";
import { favoriteFilterKey, IfavoriteAll } from "@/constants/favorite";
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
  const favoriteList = useFavoriteStore(state => state.favoriteList);
  const setFavoriteList = useFavoriteStore(state => state.setFavoriteList);

  const [filter, setFilter] = useState<string>("");

  const email = user?.email || "unknown";

  const { data: favoriteData } = useSuspenseFavoriteList(filter, {
    id: favoriteList,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data: IfavoriteAll = Object.assign(favorite);
      const idsByuser = data?.favoriteAll?.[email];

      setFavoriteList(idsByuser);
      setFilter(favoriteFilterKey[tabIdxs.join("-")]);
    }
  }, [email, favorite, setFavoriteList, tabIdxs]);

  useEffect(() => {
    useFavoriteStore.persist.rehydrate(); //Localstorage에서 favorite key의 최신값을 가져온다.
  }, []);

  return (
    <>
      <div className="mb-8 flex min-h-80 flex-col items-center justify-center gap-6">
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
        {favoriteData?.length === 0 && (
          <p className="text-gray-500">{"아직 찜한 모임이 없어요."}</p>
        )}
      </div>
    </>
  );
};

export default FavoriteList;
