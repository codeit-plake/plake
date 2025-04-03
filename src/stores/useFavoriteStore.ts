import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favoriteCount: number;
  favorite: object;
  favoriteList: Array<string>;
  setFavoriteCount: (favoriteCount: number) => void;
  updateFavoriteState: (favorite: object) => void;
  setFavoriteList: (favoriteList: Array<string>) => void;
}

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    set => ({
      favoriteCount: 0,
      favorite: {},
      favoriteList: [],
      setFavoriteCount: (favoriteCount: number) => set({ favoriteCount }),
      updateFavoriteState: (favorite: object) => set({ favorite }),
      setFavoriteList: (favoriteList: Array<string>) => set({ favoriteList }),
    }),
    {
      name: "favorite",
      partialize: state => ({
        favorite: state.favorite,
        favoriteList: state.favoriteList,
      }),
    },
  ),
);

export default useFavoriteStore;
