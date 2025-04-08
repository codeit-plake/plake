"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { IfavoriteAll } from "@/constants/favorite";
import { useModal } from "@/hooks/useModal";
import useFavoriteStore from "@/stores/useFavoriteStore";
import useUserStore from "@/stores/useUserStore";

import AlertModal from "../modals/confirm-alert-modal/AlertModal";
import FavoriteButton from "./FavoriteButton";

interface FavoriteButtonWrapperProps {
  id: string;
}

const FavoriteButtonWrapper = ({ id }: FavoriteButtonWrapperProps) => {
  const { isOpen, onClose, onOpen } = useModal();
  const [alertMessage, setAlertMessage] = useState("");
  const user = useUserStore(state => state.user);
  const { favorite } = useFavoriteStore(
    useShallow(state => ({ favorite: state.favorite })),
  );
  const favoriteList = useFavoriteStore(state => state.favoriteList);
  const updateFavoriteState = useFavoriteStore(
    state => state.updateFavoriteState,
  );
  const setFavoriteList = useFavoriteStore(state => state.setFavoriteList);

  const data: IfavoriteAll = Object.assign(favorite);
  const email = user?.email || "unknown";

  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteList?.includes(id),
  );

  const onClickToggle = (id: string) => {
    const favoriteByUser: Set<string> = new Set(favoriteList) || new Set();

    if (!favoriteByUser.has(id)) {
      if (favoriteByUser.size >= 30) {
        setAlertMessage("모임 찜하기는 최대 30개까지 가능합니다.");
        onOpen();
      } else {
        favoriteByUser.add(id);
      }
      setIsFavorite(true);
    } else {
      favoriteByUser.delete(id);
      setIsFavorite(false);
    }

    const favoriteAll = data?.favoriteAll || new Object();
    const value = Array.from(favoriteByUser);
    favoriteAll[email] = value;

    setFavoriteList(value);
    updateFavoriteState({ favoriteAll });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFavorite(favoriteList?.includes(id));
    }
  }, [favoriteList, id]);

  return (
    <>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => onClickToggle(id)}
      />
      {isOpen && (
        <AlertModal isOpen={isOpen} onClose={onClose} title={alertMessage} />
      )}
    </>
  );
};

export default FavoriteButtonWrapper;
