import InViewSlide from "@/components/ui/InViewSlide";

import MainPromotion from "./MainPromotion";

const MainPromotionContainer = () => {
  return (
    <section className="flex flex-col gap-40 md:gap-20">
      <InViewSlide direction="bottom">
        <MainPromotion type="offline" />
      </InViewSlide>
      <InViewSlide direction="bottom">
        <MainPromotion type="online" />
      </InViewSlide>
    </section>
  );
};

export default MainPromotionContainer;
