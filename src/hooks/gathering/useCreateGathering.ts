import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";
import useModalStore from "@/stores/useModalStore";

export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const openAlert = useModalStore(state => state.openAlert);

  const { mutate: createGathering, isPending } = useMutation({
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

      useModalStore.getState().onClose();
    },
    onError: error => {
      console.error("모임 생성 실패:", error);
      openAlert("모임 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleCreateGathering = (data: FormData) => {
    createGathering(data);
  };

  return { handleCreateGathering, isPending };
};
