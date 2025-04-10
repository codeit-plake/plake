"use client";

import { useState } from "react";

import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import { MAX_FAVORITE_COUNT } from "@/constants/favorite";
import useFavoriteLocalStorage from "@/hooks/useFavorite";
import { useModal } from "@/hooks/useModal";
import useFavoriteStore from "@/stores/useFavoriteStore";

import FavoriteButton from "./FavoriteButton";

interface FavoriteButtonWrapperProps {
  id: string;
}

const FavoriteButtonWrapper = ({ id }: FavoriteButtonWrapperProps) => {
  const { isOpen, onClose, onOpen } = useModal();
  const [alertMessage, setAlertMessage] = useState("");

  const { setFavoriteNewValue } = useFavoriteLocalStorage();

  const favoriteList = useFavoriteStore(state => state.favoriteList);

  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteList?.includes(id),
  );

  const onClickToggle = (id: string) => {
    const favoriteByUser: Set<string> = new Set(favoriteList) || new Set();

    if (!favoriteByUser.has(id)) {
      if (favoriteByUser.size >= MAX_FAVORITE_COUNT) {
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

    setFavoriteNewValue(favoriteByUser);
  };

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
