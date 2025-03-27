import Service from "@/services/Service";
import { IReviewResponse, TReviewQueryParams } from "@/types/review";
import { IScore } from "@/types/review/score";
import { getCookieOfToken } from "@/utils/cookieToken";

class ReviewService extends Service {
  constructor(token?: string) {
    super();
    this.setToken(token || "");
  }

  getReviewList = (searchParams?: TReviewQueryParams) => {
    let params = "";

    if (searchParams) {
      params = new URLSearchParams(searchParams).toString();
    }
    return this.http.get<IReviewResponse>(`/reviews?${params}`);
  };

  getReviewScore = () => {
    return this.http.get<IScore[]>("/reviews/scores");
  };

  getReviewsByGatheringId = (gatheringId: string) => {
    return this.http.get<IReviewResponse>(
      `/reviews?gatheringId=${gatheringId}`,
    );
  };

  createReview = () => {
    return this.http.post("/reviews", {});
  };
}

// 로그인 기반 요청 시 사용할 팩토리 함수
export async function createReviewService() {
  const token = await getCookieOfToken();
  return new ReviewService(token);
}

// 비로그인에서도 사용 가능한 기본 인스턴스
const reviewService = new ReviewService();
export { reviewService };
