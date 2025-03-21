import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";

const popularGatheringsQueryOption = () => ({
  queryKey: [QUERY_KEYS.GATHERING.popular],
  queryFn: async () => {
    const gatherings = await gatheringService.getGatheringList();
    return gatherings
      .filter(gathering =>
        dayjs(gathering.registrationEnd).isAfter(dayjs(new Date())),
      )
      .sort((a, b) => b.participantCount - a.participantCount)
      .slice(0, 10);
  },
  staleTime: 1000 * 60 * 5, // 5분
});

export const useSuspensePopularGatherings = () => {
  return useSuspenseQuery(popularGatheringsQueryOption());
};

export const prefetchPopularGatherings = async (queryClient: QueryClient) => {
  return queryClient.prefetchQuery(popularGatheringsQueryOption());
};
