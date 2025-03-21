import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";

const deadlineImminentGatheringsQueryOption = () => ({
  queryKey: [QUERY_KEYS.GATHERING.deadline],
  queryFn: async () => {
    const gatherings = await gatheringService.getGatheringList();
    return gatherings
      .filter(gathering =>
        dayjs(gathering.registrationEnd).isAfter(dayjs(new Date())),
      )
      .sort((a, b) => dayjs(a.registrationEnd).diff(dayjs(b.registrationEnd)))
      .slice(0, 10);
  },
  staleTime: 1000 * 60 * 5, // 5분
});

export const useSuspenseDeadlineImminentGatherings = () => {
  return useSuspenseQuery(deadlineImminentGatheringsQueryOption());
};

export const prefetchDeadlineImminentGatherings = async (
  queryClient: QueryClient,
) => {
  return queryClient.prefetchQuery(deadlineImminentGatheringsQueryOption());
};
