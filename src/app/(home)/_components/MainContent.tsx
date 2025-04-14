/**
 * #P101 성능: 컴포넌트 지연 로딩(lazy loading) 도입 검토
 * #P102 성능: 이미지 및 컨텐츠 최적화
 * #A101 접근성: 랜드마크 역할(role="main") 추가
 * #U101 사용자 경험: 스켈레톤 UI 적용으로 로딩 체감 개선
 */
import MainCarouselContainer from "./MainCarouselContainer";
import MainPromotionContainer from "./MainPromotionContainer";
import MainReviewContent from "./MainReviewContent";

const MainContent = () => {
  return (
    <div className="base-wrap mb-20 flex flex-col gap-40" role="main">
      <MainCarouselContainer />
      <MainPromotionContainer />
      <MainReviewContent />
    </div>
  );
};

export default MainContent;
