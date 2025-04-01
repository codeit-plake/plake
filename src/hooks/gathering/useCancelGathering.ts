import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";
import useModalStore from "@/stores/useModalStore";

export const useCancelGathering = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openAlert, openConfirm } = useModalStore(
    useShallow(state => ({
      openAlert: state.openAlert,
      openConfirm: state.openConfirm,
    })),
  );

  const { mutate } = useMutation({
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
      openAlert("잠시 후 다시 시도해주세요.");
    },
  });

  const handleCancelGathering = () => {
    openConfirm("정말 취소하시겠습니까?", () => {
      mutate();
    });
  };

  return { handleCancelGathering };
};
