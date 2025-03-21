import MainPromotion from "./MainPromotion";

const MainPromotionContainer = () => {
  return (
    <section className="flex flex-col gap-20">
      <MainPromotion type="offline" />
      <MainPromotion type="online" />
    </section>
  );
};

export default MainPromotionContainer;
