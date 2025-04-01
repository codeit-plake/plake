"use client";

import "swiper/css";
import "swiper/css/navigation";

import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CarouselArrowButton from "@/components/ui/CarouselArrowButton";
import { IGathering } from "@/types/gathering";

import MainCarouselItem from "./MainCarouselItem";

interface IMainCarouselProps {
  type: "popular" | "upcoming";
  data: IGathering[];
}

const MainCarousel = ({ type, data }: IMainCarouselProps) => {
  return (
    <section className="flex w-full flex-col gap-5">
      <p className="text-xl font-bold text-gray-900 md:text-2xl">
        {type === "popular" ? "현재 인기 많은 모임" : "곧 시작되는 모임"}
      </p>
      <div className="flex">
        <Swiper
          modules={[Navigation, A11y]}
          slidesPerView="auto"
          spaceBetween={2}
          className="relative"
        >
          <CarouselArrowButton direction="prev" />
          <CarouselArrowButton direction="next" />
          {data.map(gathering => (
            <SwiperSlide
              key={gathering.id}
              className="!ml-[15px] !w-[150px] first:!ml-0 md:!w-[240px] lg:!w-[260px]"
            >
              <MainCarouselItem gathering={gathering} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainCarousel;
