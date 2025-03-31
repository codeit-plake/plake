import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";
import useModalStore from "@/stores/useModalStore";

export const useJoinGatheringMutation = (id: string) => {
  const queryClient = useQueryClient();
  const openAlert = useModalStore(state => state.openAlert);
  return useMutation({
    mutationFn: async () => {
      return gatheringService.joinGathering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GATHERING.detail(id)],
      });
      openAlert("모임에 참여되었습니다.");
    },
    onError: () => {
      openAlert("잠시 후 다시 시도해주세요.");
    },
  });
};

export const useLeaveGatheringMutation = (
  id: string,
  invalidateKey?: unknown[],
) => {
  const queryClient = useQueryClient();
  const openAlert = useModalStore(state => state.openAlert);

  return useMutation({
    mutationFn: async () => {
      return gatheringService.leaveGathering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateKey ?? [QUERY_KEYS.GATHERING.detail(id)],
      });
      openAlert("모임에서 나가셨습니다.");
    },
    onError: () => {
      openAlert("잠시 후 다시 시도해주세요.");
    },
  });
};

export const useJoinGathering = (id: string, currentUserId?: number) => {
  const { mutate: joinGathering } = useJoinGatheringMutation(id);
  const { mutate: leaveGathering } = useLeaveGatheringMutation(id);
  const openConfirm = useModalStore(state => state.openConfirm);
  const router = useRouter();

  const handleJoinGathering = () => {
    if (!currentUserId) {
      openConfirm(
        "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?",
        () => {
          router.push("/login");
        },
      );
    } else {
      openConfirm("모임에 참여하시겠습니까?", () => {
        joinGathering();
      });
    }
  };

  const handleLeaveGathering = () => {
    openConfirm("모임에서 나가시겠습니까?", () => {
      leaveGathering();
    });
  };

  return {
    handleJoinGathering,
    handleLeaveGathering,
  };
};
