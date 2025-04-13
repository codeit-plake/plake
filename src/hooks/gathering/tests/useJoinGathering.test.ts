import { renderHook } from "@testing-library/react";
import { act } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useJoinGatheringMutation } from "@/hooks/gathering/useJoinGathering";
import gatheringService from "@/services/gathering/GatheringService";
import {
  mockInvalidateQueries,
  wrapper,
} from "@/utils/test-utils/testQueryClient";

jest.mock("@/services/gathering/GatheringService");

describe("useJoinGathering 테스트", () => {
  const mockGatheringId = "123";

  it("모임 참여 성공 시 쿼리를 무효화 함", async () => {
    const mockSuccessResponse = { success: true };
    (gatheringService.joinGathering as jest.Mock).mockResolvedValueOnce(
      mockSuccessResponse,
    );

    const { result } = renderHook(
      () => useJoinGatheringMutation(mockGatheringId),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.mutate();
    });

    expect(gatheringService.joinGathering).toHaveBeenCalledWith(
      mockGatheringId,
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEYS.GATHERING.detail(mockGatheringId)],
    });
  });

  it("모임 참여 실패 시 에러가 발생하고 콘솔에 출력함", async () => {
    const mockError = new Error("참여 실패");
    jest.spyOn(console, "log").mockImplementation(() => {});
    (gatheringService.joinGathering as jest.Mock).mockRejectedValueOnce(
      mockError,
    );

    const { result } = renderHook(
      () => useJoinGatheringMutation(mockGatheringId),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.mutate();
    });

    expect(result.current.error).toBeDefined();
    expect(console.log).toHaveBeenCalledWith("참여 실패", mockError);
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});
