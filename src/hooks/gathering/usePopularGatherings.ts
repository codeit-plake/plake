import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import anonGatheringService from "@/services/gathering/AnonGatheringService";

export const popularGatheringsQueryOption = () =>
  queryOptions({
    queryKey: [QUERY_KEYS.GATHERING.popular],
    queryFn: () => {
      return anonGatheringService.getGatheringList({
        sortBy: "participantCount",
        sortOrder: "desc",
      });
    },
    throwOnError: true,
    retry: false,
  });
