"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FaCircleCheck } from "react-icons/fa6";

import DateTimeTag from "@/components/common/DateTimeTag";
import FavoriteButtonWrapper from "@/components/common/FavoriteButtonWrapper";
import ProgressBar from "@/components/common/ProgressBar";
import { GATHERING } from "@/constants/gathering";
import { gatheringDetailQueryOption } from "@/hooks/gathering/useGatheringDetail";

import ParticipantAvatarStack from "./ParticipantAvatarStack";

interface IGatheringDetailInformationProps {
  id: string;
}

const GatheringDetailInformation = ({
  id,
}: IGatheringDetailInformationProps) => {
  const {
    data: { name, location, capacity, participantCount, dateTime },
  } = useSuspenseQuery(gatheringDetailQueryOption(id));

  const progress = (participantCount / capacity) * 100;
  const isGatheringFull = participantCount >= GATHERING.CAPACITY.MIN;

  return (
    <article className="flex h-[270px] flex-1 flex-col gap-6 rounded-3xl border-2 border-gray-200 bg-white px-1 py-6">
      <section className="flex min-h-[110px] justify-between gap-2 px-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2 pr-3 text-lg font-semibold">{name}</p>
            <p className="text-sm font-medium text-gray-700">
              {location === "홍대입구" ? "온라인" : location}
            </p>
          </div>
          <DateTimeTag date={dayjs(dateTime)} />
        </div>
        <div>
          <FavoriteButtonWrapper id={id} />
        </div>
      </section>
      <hr className="border-b-2 border-dashed border-gray-200" />
      <section className="flex flex-col gap-2 px-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-900">
            <p>{`모집 정원 ${capacity}명`}</p>
            <ParticipantAvatarStack id={id} />
          </div>
          {isGatheringFull && (
            <div className="flex items-center gap-2 text-purple-500">
              <FaCircleCheck size={18} />
              <p className="text-sm font-medium">{"개설 확정"}</p>
            </div>
          )}
        </div>
        <ProgressBar progress={progress} />
        <div className="flex items-center justify-between text-xs font-medium text-gray-700">
          <span>{`최소인원 ${GATHERING.CAPACITY.MIN}명`}</span>
          <span>{`최대인원 ${GATHERING.CAPACITY.MAX}명`}</span>
        </div>
      </section>
    </article>
  );
};

export default GatheringDetailInformation;
