"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import Avatar from "@/components/common/Avatar";
import { participantsQueryOption } from "@/hooks/gathering/useParticipants";
import { IUser } from "@/types/user";

interface IParticipantAvatarStackProps {
  id: string;
}

const ParticipantAvatarStack = ({ id }: IParticipantAvatarStackProps) => {
  const { data } = useSuspenseQuery(participantsQueryOption(id));

  const slicedData = data.slice(0, 4);

  if (data.length === 0) {
    return <></>;
  }

  return (
    <div className="flex -space-x-3">
      {slicedData?.map(({ User }: { User: IUser }) => (
        <div key={User.id} className="hover:z-20">
          <Avatar type="default" size="small" imgPath={User.image} />
        </div>
      ))}
      {data?.length && data.length > 4 && (
        <div className="z-10 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
          +{data.length - 4}
        </div>
      )}
    </div>
  );
};

export default ParticipantAvatarStack;
