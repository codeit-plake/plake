import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";

export const useCancelGathering = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: async () => {
      return gatheringService.deleteGathering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GATHERING.all],
      });
      router.back();
    },
    onError: () => {
      console.log("모임 취소 실패", error);
    },
  });

  return { handleCancelGathering: mutate, error };
};
