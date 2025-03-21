"use client";

import { useSuspensePopularGatherings } from "@/hooks/gathering/usePopularGatherings";

import MainCarousel from "./MainCarousel";

const PopularCarousel = () => {
  const { data: popularData } = useSuspensePopularGatherings();

  return <MainCarousel type="popular" data={popularData} />;
};

export default PopularCarousel;
