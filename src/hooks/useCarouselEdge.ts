import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

interface IUseCarouselEdgeProps {
  direction: "prev" | "next";
}

const useCarouselEdge = ({ direction }: IUseCarouselEdgeProps) => {
  const swiper = useSwiper();
  const [isEdge, setIsEdge] = useState(direction === "prev" ? true : false);

  useEffect(() => {
    const updateEdgeStatus = () => {
      if (direction === "prev") {
        setIsEdge(swiper.isBeginning);
      } else {
        setIsEdge(swiper.isEnd);
      }
    };

    updateEdgeStatus();

    swiper.on("slideChange", updateEdgeStatus);
    swiper.on("snapGridLengthChange", updateEdgeStatus);

    return () => {
      swiper.off("slideChange", updateEdgeStatus);
      swiper.off("snapGridLengthChange", updateEdgeStatus);
    };
  }, [swiper, direction]);

  return { isEdge, swiper };
};

export default useCarouselEdge;
