"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MAIN_BANNER_ITEMS } from "@/constants/ui";

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % MAIN_BANNER_ITEMS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href={MAIN_BANNER_ITEMS[currentIndex].link}
      className="relative h-[50vh] max-h-[500px] w-full overflow-hidden bg-gray-500 md:h-[90vh] md:max-h-[1080px]"
    >
      {/* 이미지 슬라이드 영역 */}
      <div className="relative h-full w-full">
        {MAIN_BANNER_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={`main_banner_${item.text}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              placeholder="blur"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* 텍스트 애니메이션 영역 */}
      <div className="base-wrap absolute bottom-0 left-0 right-0 z-20 flex h-full flex-col justify-end gap-5 p-10 px-5 text-3xl font-bold text-white md:py-28 md:text-5xl md:font-extrabold">
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
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="block"
              >
                {MAIN_BANNER_ITEMS[currentIndex].text}
              </motion.span>
            </AnimatePresence>
          </span>
          {" 어떠세요?"}
        </p>
      </div>
    </Link>
  );
};

export default MainBanner;
