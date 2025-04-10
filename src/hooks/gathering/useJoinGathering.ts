import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";

export const useJoinGatheringMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return gatheringService.joinGathering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GATHERING.detail(id)],
      });
    },
    onError: error => {
      console.log("참여 실패", error);
    },
  });
};

export const useLeaveGatheringMutation = (
  id: string,
  invalidateKey?: unknown[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return gatheringService.leaveGathering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateKey ?? [QUERY_KEYS.GATHERING.detail(id)],
      });
    },
    onError: error => {
      console.log("참여 취소 실패", error);
    },
  });
};
