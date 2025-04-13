import { renderHook } from "@testing-library/react";
import { act } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import gatheringService from "@/services/gathering/GatheringService";
import {
  mockInvalidateQueries,
  wrapper,
} from "@/utils/test-utils/testQueryClient";

import { useLeaveGatheringMutation } from "../useLeaveGathering";

jest.mock("@/services/gathering/GatheringService");

describe("useLeaveGathering 테스트", () => {
  const mockGatheringId = "123";
  const mockInvalidateKey = [QUERY_KEYS.GATHERING.detail(mockGatheringId)];

  it("모임 참여 취소 성공 시 쿼리를 무효화 함", async () => {
    const mockSuccessResponse = { success: true };
    (gatheringService.leaveGathering as jest.Mock).mockResolvedValueOnce(
      mockSuccessResponse,
    );

    const { result } = renderHook(
      () => useLeaveGatheringMutation(mockGatheringId, mockInvalidateKey),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.mutate();
    });

    expect(gatheringService.leaveGathering).toHaveBeenCalledWith(
      mockGatheringId,
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: mockInvalidateKey,
    });
  });

  it("모임 참여 취소 실패 시 에러가 발생하고 콘솔에 출력함", async () => {
    const mockError = new Error("참여 취소 실패");
    jest.spyOn(console, "log").mockImplementation(() => {});
    (gatheringService.leaveGathering as jest.Mock).mockRejectedValueOnce(
      mockError,
    );

    const { result } = renderHook(
      () => useLeaveGatheringMutation(mockGatheringId, mockInvalidateKey),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.mutate();
    });

    expect(result.current.error).toBeDefined();
    expect(console.log).toHaveBeenCalledWith("참여 취소 실패", mockError);
  });
});
