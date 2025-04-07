import { GatheringType } from "@/types/gathering";
import { IMyGathering } from "@/types/gathering/my-card";
import { mockUserStore } from "@/utils/test-utils/userMocking";

export const mockMyGathering = (
  overrides: Partial<IMyGathering> = {},
): IMyGathering => {
  const defaultMyGathering: IMyGathering = {
    teamId: 1,
    id: 1,
    name: "테스트 내 모임",
    type: GatheringType.MINDFULNESS,
    dateTime: "2025-04-04T18:00:00Z",
    registrationEnd: "2025-04-04T17:00:00Z",
    location: "홍대입구역",
    participantCount: 5,
    capacity: 10,
    image: null,
    createdBy: mockUserStore.loggedIn().user.id,
    canceledAt: null,
    joinedAt: "2025-04-01T12:00:00Z",
    isCompleted: false,
    isReviewed: false,
  };

  return {
    ...defaultMyGathering,
    ...overrides,
  };
};

export const mockMyGatherings = (count = 3): IMyGathering[] => {
  return Array.from({ length: count }).map((_, index) =>
    mockMyGathering({
      id: index + 1,
      name: `테스트 내 모임 ${index + 1}`,
    }),
  );
};
