"use client";

import "swiper/css";
import "swiper/css/navigation";

import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CarouselArrowButton from "@/components/ui/CarouselArrowButton";
import { IGathering } from "@/types/gathering";

import MainCarouselItem from "./MainCarouselItem";

interface IMainCarouselProps {
  type: "popular" | "deadline";
  data: IGathering[];
}

const MainCarousel = ({ type, data }: IMainCarouselProps) => {
  return (
    <section className="flex w-full flex-col gap-5">
      <p className="text-2xl font-bold text-gray-900">
        {type === "popular" ? "현재 인기 많은 모임" : "마감 임박한 모임"}
      </p>
      <div className="flex">
        <Swiper
          modules={[Navigation, A11y]}
          slidesPerView={2.5}
          spaceBetween={5}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
            },
            1024: {
              slidesPerView: 4.5,
            },
          }}
          className="relative"
        >
          <CarouselArrowButton direction="prev" />
          <CarouselArrowButton direction="next" />
          {data.map(gathering => (
            <SwiperSlide key={gathering.id}>
              <MainCarouselItem gathering={gathering} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainCarousel;
