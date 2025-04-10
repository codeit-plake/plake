import { IGathering } from "@/types/gathering";

export const closedGatheringMock: IGathering = {
  teamId: 1,
  id: 1,
  name: "테스트 내 모임",
  dateTime: "2025-04-04T18:00:00Z",
  registrationEnd: "2025-04-01T17:00:00Z",
  location: "홍대입구역",
  participantCount: 5,
  capacity: 10,
  image: null,
};

export const mockGathering = (
  overrides: Partial<IGathering> = {},
): IGathering => {
  const defaultGathering: IGathering = {
    teamId: 1,
    id: 1,
    name: "테스트 내 모임",
    dateTime: "2025-04-04T18:00:00Z",
    registrationEnd: "2025-04-10T17:00:00Z",
    location: "홍대입구역",
    participantCount: 5,
    capacity: 10,
    image: null,
  };

  return {
    ...defaultGathering,
    ...overrides,
  };
};

export const mockGatherings = (count = 3): IGathering[] => {
  return Array.from({ length: count }).map((_, index) =>
    mockGathering({
      id: index + 1,
      name: `테스트 내 모임 ${index + 1}`,
    }),
  );
};
