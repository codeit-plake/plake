import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useCancelGathering } from "@/hooks/gathering/useCancelGathering";
import gatheringService from "@/services/gathering/GatheringService";
import {
  mockInvalidateQueries,
  wrapper,
} from "@/utils/test-utils/testQueryClient";

jest.mock("@/services/gathering/GatheringService");

describe("useCancelGathering 테스트", () => {
  const mockBack = jest.fn();
  const mockGatheringId = "test1234";

  it("모임 취소 성공 시 쿼리를 무효화하고 이전 페이지로 이동함", async () => {
    const mockSuccessResponse = { success: true };
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    (gatheringService.deleteGathering as jest.Mock).mockResolvedValueOnce(
      mockSuccessResponse,
    );

    const { result } = renderHook(() => useCancelGathering(mockGatheringId), {
      wrapper,
    });

    await act(async () => {
      result.current.mutate();
    });

    expect(gatheringService.deleteGathering).toHaveBeenCalledWith(
      mockGatheringId,
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEYS.GATHERING.all],
    });
    expect(mockBack).toHaveBeenCalled();
  });

  it("모임 취소 실패 시 에러가 발생하고 콘솔에 출력함", async () => {
    const mockError = new Error("취소 실패");
    jest.spyOn(console, "log").mockImplementation(() => {});
    (gatheringService.deleteGathering as jest.Mock).mockRejectedValueOnce(
      mockError,
    );

    const { result } = renderHook(() => useCancelGathering(mockGatheringId), {
      wrapper,
    });

    await act(async () => {
      result.current.mutate();
    });

    // 에러 발생 및 콘솔 출력
    expect(result.current.error).toBeDefined();
    expect(console.log).toHaveBeenCalledWith("모임 취소 실패", mockError);
    // 에러 발생 시 쿼리무효화 및 이전 페이지로 이동 안됨
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
    expect(mockBack).not.toHaveBeenCalled();
  });
});
