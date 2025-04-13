import { GATHERING_FORM } from "@/constants/gathering";
import { CreateGatheringFormType } from "@/schemas/gatheringSchema";
import { GatheringType, IGathering, IParticipant } from "@/types/gathering";

import { mockUser } from "./userMocking";

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
    name: "테스트 모임",
    type: GatheringType.MINDFULNESS,
    dateTime: "2023-12-16T09:00:00Z",
    registrationEnd: "2023-12-16T09:00:00Z",
    location: "을지로3가",
    participantCount: 0,
    capacity: 10,
    image: "/images/test-image.png",
    createdBy: 1,
    canceledAt: null,
  };

  return {
    ...defaultGathering,
    ...overrides,
  };
};

export const mockGatheringParticipants = (
  overrides: Partial<IParticipant> = {},
): IParticipant => {
  const defaultGatheringParticipants: IParticipant = {
    User: mockUser,
    teamId: 1,
    userId: 1,
    gatheringId: 1,
    joinedAt: "2023-12-16T09:00:00Z",
  };

  return {
    ...defaultGatheringParticipants,
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

export const getMockGatheringForm = (
  overrides: Partial<CreateGatheringFormType> = {},
): CreateGatheringFormType => {
  return {
    ...GATHERING_FORM,
    ...overrides,
  };
};
