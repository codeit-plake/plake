"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { memo } from "react";

import { IGathering } from "@/types/gathering";

import ClosedMainCardItem from "./ClosedMainCardItem";
import MainCardContent from "./MainCardContent";
import MainCardImage from "./MainCardImage";

interface IMainCardItemProps {
  gathering: IGathering;
}

const MainCardItem = memo(({ gathering }: IMainCardItemProps) => {
  const {
    id,
    name,
    dateTime,
    registrationEnd,
    location,
    participantCount,
    capacity,
    image,
  } = gathering;
  const today = dayjs();
  const isOpened = dayjs(registrationEnd).isAfter(today); // 모임오픈 여부 (모임이 종료되지 않았을 경우: true)

  return (
    <article className="relative w-full" aria-label="모임 카드">
      <Link
        href={`/gathering/detail/${id}`}
        className="absolute z-10 h-full w-full"
      ></Link>
      <div className="relative m-auto flex min-w-[343px] flex-col overflow-hidden rounded-3xl border-2 border-gray-100 bg-white md:flex-row lg:flex-row">
        <MainCardImage
          image={image}
          name={name}
          registrationEnd={dayjs(registrationEnd)}
        />
        <MainCardContent
          name={name}
          location={location}
          dateTime={dayjs(dateTime)}
          id={id.toString()}
          participantCount={participantCount}
          capacity={capacity}
        />
        {!isOpened && <ClosedMainCardItem />}
      </div>
    </article>
  );
});

MainCardItem.displayName = "MainCardItem";

export default MainCardItem;
