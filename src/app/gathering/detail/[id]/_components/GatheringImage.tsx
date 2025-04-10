"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";

import DeadlineTag from "@/components/common/DeadlineTag";
import { gatheringDetailQueryOption } from "@/hooks/gathering/useGatheringDetail";

interface IGatheringImageProps {
  id: string;
}

const GatheringImage = ({ id }: IGatheringImageProps) => {
  const { data } = useSuspenseQuery(gatheringDetailQueryOption(id));

  return (
    <figure className="relative min-h-[270px] flex-1 overflow-hidden rounded-3xl bg-gray-300">
      <DeadlineTag registrationEnd={dayjs(data?.registrationEnd)} />
      <Image
        src={data.image || "/images/gathering_default.png"}
        alt="gathering-image"
        fill
        sizes="(max-width: 768px) 90vw, 40vw"
        className="object-cover"
        priority
      />
    </figure>
  );
};

export default GatheringImage;
