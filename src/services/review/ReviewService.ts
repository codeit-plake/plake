import { TReviewForm } from "@/schemas/reviewSchema";
import { ApiRouteService } from "@/services/Service";

class ReviewService extends ApiRouteService {
  async createReview(data: TReviewForm) {
    return this.http.post("/reviews", data);
  }
}

const reviewService = new ReviewService();

export default reviewService;
