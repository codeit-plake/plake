"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
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
      <DeadlineTag registrationEnd={new Date(data?.registrationEnd ?? "")} />
      <Image
        src={data.image || "https://picsum.photos/500/700"}
        alt="gathering-image"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
    </figure>
  );
};

export default GatheringImage;
