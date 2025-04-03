import { useSuspenseQuery } from "@tanstack/react-query";

import { IFavoriteFilterParams } from "@/constants/favorite";
import { ONLINE } from "@/constants/gatheringFilterParams";
import { QUERY_KEYS } from "@/constants/queryKeys";
import anonGatheringService from "@/services/gathering/AnonGatheringService";
import { IGathering } from "@/types/gathering";

const filterFavorite = (data: IGathering[], filter: string) => {
  switch (filter) {
    case "OFFLINE":
      return data.filter(gathering => gathering.location !== ONLINE.location);
    case "OFFLINE_EXERCISE":
      return data.filter(
        gathering =>
          gathering.location !== ONLINE.location &&
          gathering.type === "OFFICE_STRETCHING",
      );
    case "OFFLINE_DINING":
      return data.filter(
        gathering =>
          gathering.location !== ONLINE.location &&
          gathering.type === "MINDFULNESS",
      );
    case "OFFLINE_ART":
      return data.filter(
        gathering =>
          gathering.location !== ONLINE.location &&
          gathering.type === "WORKATION",
      );
    case "ONLINE":
      return data.filter(
        gathering =>
          gathering.location === ONLINE.location &&
          gathering.type === "WORKATION",
      );
  }
};

const favoriteListQueryOption = (
  filterByValue: string,
  params: IFavoriteFilterParams,
) => ({
  queryKey: [QUERY_KEYS.FAVORITE.listByFilterValue(filterByValue, params)],
  queryFn: () => {
    return anonGatheringService.getFavoriteList(params);
  },
  throwOnError: true,
  retry: false,
  select: (data: IGathering[]) => filterFavorite(data, filterByValue),
});

export const useSuspenseFavoriteList = (
  filterByValue: string,
  params: IFavoriteFilterParams,
) => {
  return useSuspenseQuery(favoriteListQueryOption(filterByValue, params));
};
