"use client";

import { useSuspenseDeadlineImminentGatherings } from "@/hooks/gathering/useDeadlineImminentGatherings";

import MainCarousel from "./MainCarousel";

const DeadLineCarousel = () => {
  const { data: deadlineData } = useSuspenseDeadlineImminentGatherings();

  return <MainCarousel type="deadline" data={deadlineData} />;
};

export default DeadLineCarousel;
