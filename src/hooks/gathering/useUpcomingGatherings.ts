import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import anonGatheringService from "@/services/gathering/AnonGatheringService";

export const upcomingGatheringsQueryOption = () =>
  queryOptions({
    queryKey: [QUERY_KEYS.GATHERING.upcoming],
    queryFn: () => {
      return anonGatheringService.getGatheringList({
        sortBy: "dateTime",
        sortOrder: "asc",
      });
    },
    throwOnError: true,
    retry: false,
  });
