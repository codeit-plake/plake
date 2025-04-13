"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { upcomingGatheringsQueryOption } from "@/hooks/gathering/useUpcomingGatherings";

import MainCarousel from "./MainCarousel";

const UpcomingCarousel = () => {
  const { data: upcomingData } = useSuspenseQuery(
    upcomingGatheringsQueryOption(),
  );

  return <MainCarousel type="upcoming" data={upcomingData} />;
};

export default UpcomingCarousel;
