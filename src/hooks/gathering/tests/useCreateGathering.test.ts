import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useCreateGathering } from "@/hooks/gathering/useCreateGathering";
import gatheringService from "@/services/gathering/GatheringService";
import {
  mockInvalidateQueries,
  wrapper,
} from "@/utils/test-utils/testQueryClient";

jest.mock("@/services/gathering/GatheringService");

describe("useCreateGathering 테스트", () => {
  const mockGatheringId = "123";
  const mockPush = jest.fn();
  const mockFormData = new FormData();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("모임 생성 성공 시 자동으로 모임에 참여되며 쿼리를 무효화하고 상세페이지로 이동함", async () => {
    (gatheringService.createGathering as jest.Mock).mockResolvedValueOnce({
      id: mockGatheringId,
    });
    (gatheringService.joinGathering as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    const { result } = renderHook(() => useCreateGathering(), { wrapper });

    await act(async () => {
      result.current.mutate(mockFormData);
    });

    expect(gatheringService.createGathering).toHaveBeenCalledWith(mockFormData);
    expect(gatheringService.joinGathering).toHaveBeenCalledWith(
      mockGatheringId,
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEYS.GATHERING.all],
    });
    expect(mockPush).toHaveBeenCalledWith(
      `/gathering/detail/${mockGatheringId}`,
    );
  });

  it("모임 실패 시 에러를 콘솔에 출력하고 추가 작업을 수행하지 않음", async () => {
    const mockError = new Error("생성 실패");
    (gatheringService.createGathering as jest.Mock).mockRejectedValueOnce(
      mockError,
    );

    const { result } = renderHook(() => useCreateGathering(), { wrapper });

    await act(async () => {
      result.current.mutate(mockFormData);
    });

    expect(console.error).toHaveBeenCalledWith("모임 생성 실패:", mockError);
    // 에러가 발생하면 성공 시 콜백이 호출되지 않음
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(gatheringService.joinGathering).not.toHaveBeenCalled();
  });
});
