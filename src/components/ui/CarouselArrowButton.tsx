import clsx from "clsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import useCarouselEdge from "@/hooks/useCarouselEdge";

const CarouselArrowButton = ({ direction }: { direction: "prev" | "next" }) => {
  const { isEdge, swiper } = useCarouselEdge({ direction });

  return (
    <button
      onClick={() =>
        direction === "prev" ? swiper.slidePrev() : swiper.slideNext()
      }
      className={clsx(
        "",
        direction === "prev" ? "left-2" : "right-2",
        isEdge && "hidden",
        "group absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-all duration-200 hover:bg-white",
      )}
    >
      {direction === "prev" ? (
        <IoIosArrowBack className="-translate-x-[2px] text-2xl text-gray-800 group-hover:text-gray-600" />
      ) : (
        <IoIosArrowForward className="translate-x-[2px] text-2xl text-gray-800 group-hover:text-gray-600" />
      )}
    </button>
  );
};

export default CarouselArrowButton;
