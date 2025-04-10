"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringDetailQueryOption } from "@/hooks/gathering/useGatheringDetail";
import { participantsQueryOption } from "@/hooks/gathering/useParticipants";
import useUserStore from "@/stores/useUserStore";
import { IParticipant } from "@/types/gathering";

import OrganizerButtons from "./OrganizerButtons";
import ParticipantButtons from "./ParticipantButtons";

interface IFloatingBarProps {
  id: string;
}

const FloatingBar = ({ id }: IFloatingBarProps) => {
  const {
    data: { createdBy, registrationEnd },
  } = useSuspenseQuery(gatheringDetailQueryOption(id));
  const { data: participants } = useSuspenseQuery(participantsQueryOption(id));

  const user = useUserStore(state => state.user);
  const currentUserId = user?.id;

  const isParticipant = participants?.some(
    (participant: IParticipant) => participant.userId === currentUserId,
  );
  const isOrganizer = currentUserId === createdBy;
  const isRegistrationEnd = new Date(registrationEnd) < new Date();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex min-h-[84px] items-center border-t-2 border-gray-200 bg-white py-5">
      <div className="base-wrap flex h-full w-full flex-wrap items-start justify-between gap-5 xs:flex-nowrap">
        <div className="flex h-full flex-col gap-2">
          <p className="text-base font-semibold">
            {"일상에 쉼표를, 즐거움에 느낌표를! 🎉‍️️"}
          </p>
          <p className="text-xs font-medium">
            {"지친 하루에 브레이크를 걸고, 새로운 경험을 시작해보세요."}
          </p>
        </div>
        {isOrganizer ? (
          <OrganizerButtons id={id} isRegistrationEnd={isRegistrationEnd} />
        ) : (
          <>
            {!isRegistrationEnd && (
              <ParticipantButtons
                id={id}
                currentUserId={currentUserId}
                isParticipant={isParticipant}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingBar;
