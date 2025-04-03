import { IGatheringFilterParams } from "@/types/gathering";
import { TReviewQueryParams } from "@/types/review";

import { IFavoriteFilterParams } from "./favorite";

const AUTH_ALL = "auth" as const;
const GATHERING_ALL = ["gathering"] as const;
const REVIEW_ALL = ["review"] as const;
const FAVORITE_ALL = ["favorite"] as const;

export const QUERY_KEYS = {
  AUTH: {
    all: AUTH_ALL,
  },
  GATHERING: {
    all: GATHERING_ALL,
    list: [...GATHERING_ALL, "list"] as const,
    myList: [...GATHERING_ALL, "myList"] as const,
    listByParams: (tab: string, params?: IGatheringFilterParams) =>
      [...GATHERING_ALL, "list", tab, params] as const,
    popular: [...GATHERING_ALL, "list", "popular"] as const,
    upcoming: [...GATHERING_ALL, "list", "upcoming"] as const,
    detail: (gatheringId: string) =>
      [...GATHERING_ALL, { gatheringId }] as const,
    participants: (gatheringId: string) =>
      [...GATHERING_ALL, { gatheringId }, "participants"] as const,
  },
  REVIEW: {
    all: REVIEW_ALL,
    list: [...REVIEW_ALL, "list"] as const,
    listByQueryParams: (searchParams?: TReviewQueryParams) =>
      [...REVIEW_ALL, "list", searchParams] as const,
    listByGatheringId: (gatheringId: string) =>
      [...REVIEW_ALL, "list", { gatheringId }] as const,
    score: [...REVIEW_ALL, "score"] as const,
  },
  FAVORITE: {
    all: FAVORITE_ALL,
    listByFilterValue: (filterByValue: string, params: IFavoriteFilterParams) =>
      [...FAVORITE_ALL, "list", filterByValue, params] as const,
  },
};
