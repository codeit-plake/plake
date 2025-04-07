"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainBanner = () => {
  const animatedTexts = ["러닝", "게임", "음악", "치맥"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % animatedTexts.length);
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 3000); // 3초마다 텍스트,슬라이드 변경

    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  return (
    <section className="relative h-[50vh] max-h-[500px] w-full overflow-hidden md:h-[90vh] md:max-h-[1080px]">
      <Swiper
        className="h-full"
        allowTouchMove={false}
        effect={"fade"}
        modules={[EffectFade]}
        loop={true}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
      >
        {animatedTexts.map((text, index) => (
          <SwiperSlide key={text}>
            <Image
              src={`/images/main_slide${index + 1}.jpg`}
              alt="main_banner"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="base-wrap absolute bottom-0 left-0 right-0 z-10 flex h-full flex-col justify-end gap-5 p-10 px-5 text-3xl font-bold text-white md:py-28 md:text-5xl md:font-extrabold">
        <p>{"지친 일상을 잠시 멈추고"}</p>
        <p className="overflow-hidden">
          {"함께 "}
          <span className="inline-block rounded-lg bg-black/55 px-4 py-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-120%" }}
                className="block"
              >
                {animatedTexts[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          {" 어떠세요?"}
        </p>
      </div>
    </section>
  );
};

export default MainBanner;
