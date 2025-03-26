"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { useCancelGathering } from "@/hooks/gathering/useCancelGathering";
import { gatheringDetailQueryOption } from "@/hooks/gathering/useGatheringDetail";
import { useJoinGathering } from "@/hooks/gathering/useJoinGathering";
import { useIsParticipant } from "@/hooks/gathering/useParticipants";
import useCopyLink from "@/hooks/useCopyLink";
import useUserStore from "@/stores/useUserStore";

interface IFloatingBarProps {
  id: string;
}

const FloatingBar = ({ id }: IFloatingBarProps) => {
  const {
    data: { createdBy },
  } = useSuspenseQuery(gatheringDetailQueryOption(id));
  const user = useUserStore(state => state.user);
  const currentUserId = user?.id;

  const { handleJoinGathering, handleLeaveGathering } = useJoinGathering(
    id,
    currentUserId,
  );
  const { handleCancelGathering } = useCancelGathering(id);
  const { handleCopyLink } = useCopyLink();

  const isParticipant = useIsParticipant(id, currentUserId);
  const isOrganizer = currentUserId === createdBy;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex min-h-[84px] items-center border-t-2 border-gray-200 bg-white py-5">
      <div className="base-wrap flex h-full w-full flex-wrap items-start justify-between gap-5 xs:flex-nowrap">
        <div className="flex h-full flex-col gap-2">
          <p className="text-base font-semibold">
            {"더 건강한 나와 팀을 위한 프로그램 🏃‍️️"}
          </p>
          <p className="text-xs font-medium">
            {
              "국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요"
            }
          </p>
        </div>
        {isOrganizer ? (
          <div className="flex gap-2">
            <Button onClick={handleCancelGathering} variant="purple-outline">
              {"취소하기"}
            </Button>
            <Button variant="purple" onClick={handleCopyLink}>
              {"공유하기"}
            </Button>
          </div>
        ) : (
          <>
            {isParticipant ? (
              <Button onClick={handleLeaveGathering} variant="purple-outline">
                {"참여 취소하기"}
              </Button>
            ) : (
              <Button onClick={handleJoinGathering} variant="purple">
                {"참여하기"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingBar;
