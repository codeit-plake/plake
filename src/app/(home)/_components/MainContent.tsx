import MainCarouselContainer from "./MainCarouselContainer";
import MainPromotionContainer from "./MainPromotionContainer";
import MainReviewContent from "./MainReviewContent";

const MainContent = () => {
  return (
    <div className="base-wrap mb-20 flex flex-col gap-32">
      <MainCarouselContainer />
      <MainPromotionContainer />
      <MainReviewContent />
    </div>
  );
};

export default MainContent;
