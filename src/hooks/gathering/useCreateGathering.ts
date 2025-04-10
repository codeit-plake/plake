import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";

export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: createGathering,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: FormData) => {
      return gatheringService.createGathering(data);
    },
    onSuccess: async data => {
      const gatheringId = String(data.id);

      await gatheringService.joinGathering(gatheringId);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GATHERING.all],
      });

      router.push(`/gathering/detail/${gatheringId}`);
    },
    onError: error => {
      console.error("모임 생성 실패:", error);
    },
  });

  const handleCreateGathering = (data: FormData) => {
    createGathering(data);
  };

  return { handleCreateGathering, isPending, isError, isSuccess };
};
