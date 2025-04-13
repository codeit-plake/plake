import { GatheringType, IGathering } from "@/types/gathering";
import { IReview, IReviewResponse } from "@/types/review";
import { mockUserStore } from "@/utils/test-utils/userMocking";

export const mockGathering = (overrides = {}): IGathering => {
  const defaultGathering: IGathering = {
    teamId: 1,
    id: 1,
    name: "테스트 모임",
    type: GatheringType.MINDFULNESS,
    dateTime: "2023-12-16T09:00:00Z",
    registrationEnd: "2023-12-16T09:00:00Z",
    location: "을지로3가",
    participantCount: 0,
    capacity: 10,
    image: null,
    createdBy: 1,
    canceledAt: null,
  };

  return {
    ...defaultGathering,
    ...overrides,
  };
};

export const mockReview = (overrides = {}): IReview => {
  const defaultReview: IReview = {
    id: 1,
    teamId: 1,
    score: 4.5,
    comment:
      "이 모임은 정말 유익했습니다. 다양한 의견을 나눌 수 있어 좋았고, 다음에도 참여하고 싶습니다.",
    createdAt: "2023-12-16T09:00:00Z",
    User: mockUserStore.loggedIn().user,
    Gathering: mockGathering(),
  };

  return {
    ...defaultReview,
    ...overrides,
  };
};

export const mockReviews = (count = 3): IReview[] => {
  return Array.from({ length: count }).map((_, index) => {
    return mockReview({
      id: index + 1,
    });
  });
};

export const mockResponse: IReviewResponse = {
  data: mockReviews(),
  currentPage: 1,
  totalPages: 3,
  totalItemCount: 10,
};
