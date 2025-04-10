import { useShallow } from "zustand/shallow";

import { IFavorite, MAX_FAVORITE_COUNT } from "@/constants/favorite";
import useFavoriteStore from "@/stores/useFavoriteStore";
import useUserStore from "@/stores/useUserStore";

const useFavoriteLocalStorage = () => {
  const user = useUserStore(state => state.user);

  const { favorite } = useFavoriteStore(
    useShallow(state => ({ favorite: state.favorite })),
  );
  const favoriteList = useFavoriteStore(state => state.favoriteList);
  const updateFavoriteState = useFavoriteStore(
    state => state.updateFavoriteState,
  );
  const setFavoriteList = useFavoriteStore(state => state.setFavoriteList);

  const data: IFavorite = Object.assign(favorite);
  const favoriteAll = data || new Object();
  const email: string = user?.email || "unknown";

  const favoriteByUserLength = () => {
    return favoriteList.length;
  };

  const favoriteListByUser = (user?: string) => {
    const value = favoriteAll[user || "unknown"] || [];

    return value.slice(0, MAX_FAVORITE_COUNT);
  };

  const setFavoriteInitValue = (user: string) => {
    const favoriteList = favoriteListByUser(user);
    setFavoriteList(favoriteList);
  };

  const setFavoriteNewValue = (favoriteByUser: Set<string>) => {
    const value = Array.from(favoriteByUser);
    favoriteAll[email] = value;

    setFavoriteList(value);
    updateFavoriteState(favoriteAll);
  };

  return {
    favoriteByUserLength,
    setFavoriteInitValue,
    setFavoriteNewValue,
    favoriteListByUser,
  };
};

export default useFavoriteLocalStorage;
