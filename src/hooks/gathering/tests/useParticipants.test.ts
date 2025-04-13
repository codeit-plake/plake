import { QUERY_KEYS } from "@/constants/queryKeys";
import { participantsQueryOption } from "@/hooks/gathering/useParticipants";
import anonGatheringService from "@/services/gathering/AnonGatheringService";
import {
  mockGathering,
  mockGatheringParticipants,
} from "@/utils/test-utils/gatheringMocking";
import { getMockContext } from "@/utils/test-utils/testQueryClient";

jest.mock("@/services/gathering/AnonGatheringService");

describe("useParticipants 테스트", () => {
  const mockGatheringId = "1";
  const mockQueryOption = participantsQueryOption(mockGatheringId);
  const mockContext = getMockContext([
    QUERY_KEYS.GATHERING.participants(mockGatheringId),
  ]);

  it("올바른 queryKey, queryFn, 옵션을 반환해야 함", async () => {
    const mockData = mockGathering();
    (
      anonGatheringService.getGatheringParticipants as jest.Mock
    ).mockResolvedValue(mockData);

    // queryKey 확인
    expect(mockQueryOption.queryKey).toEqual([
      QUERY_KEYS.GATHERING.participants(mockGatheringId),
    ]);

    // 옵션 확인
    expect(mockQueryOption.throwOnError).toBe(true);
    expect(mockQueryOption.retry).toBe(false);

    // queryFn 확인
    expect(mockQueryOption.queryFn).toBeDefined();

    await mockQueryOption.queryFn!(mockContext);

    // queryFn 호출 확인
    expect(anonGatheringService.getGatheringParticipants).toHaveBeenCalledWith(
      mockGatheringId,
    );
  });

  it("queryFn 실행 시 올바른 데이터를 반환해야 함", async () => {
    const mockData = [mockGatheringParticipants()];
    (
      anonGatheringService.getGatheringParticipants as jest.Mock
    ).mockResolvedValue(mockData);

    const result = await mockQueryOption.queryFn!(mockContext);

    expect(result).toEqual(mockData);
  });

  it("queryFn 실행 시 에러가 발생하면 오류를 던져야 함", async () => {
    const mockError = new Error("테스트 에러");
    (
      anonGatheringService.getGatheringParticipants as jest.Mock
    ).mockRejectedValue(mockError);

    await expect(mockQueryOption.queryFn!(mockContext)).rejects.toThrow(
      mockError,
    );
  });
});
