import { QUERY_KEYS } from "@/constants/queryKeys";
import {
  createPaginationParams,
  fetchMyGatheringList,
  myGatheringQueryOptions,
} from "@/hooks/gathering/useMyGatheringList";
import gatheringService from "@/services/gathering/GatheringService";
import { IMyGathering, IMyGatheringFilterParams } from "@/types/gathering";
import { mockMyGatherings } from "@/utils/test-utils/myGatheringMocking";

jest.mock("@/services/gathering/GatheringService", () => ({
  __esModule: true,
  default: {
    getMyGatheringList: jest.fn(),
  },
}));

describe("useSuspenseMyGatheringList utils", () => {
  describe("createPaginationParams", () => {
    it("페이지 번호에 따라 올바른 offset과 limit을 반환한다", () => {
      expect(createPaginationParams(1)).toEqual({ offset: "0", limit: "10" });
      expect(createPaginationParams(3)).toEqual({ offset: "20", limit: "10" });
      expect(createPaginationParams(2, 5)).toEqual({ offset: "5", limit: "5" });
    });
  });

  describe("fetchMyGatheringList", () => {
    const mockParams: IMyGatheringFilterParams = {
      sortBy: "dateTime",
      sortOrder: "desc",
    };

    it("pageParam = 2일 때 올바른 offset을 포함한 요청을 보내고 데이터를 반환한다", async () => {
      const mockData = mockMyGatherings(10);
      (gatheringService.getMyGatheringList as jest.Mock).mockResolvedValue(
        mockData,
      );

      const result = await fetchMyGatheringList(mockParams, 2);

      expect(gatheringService.getMyGatheringList).toHaveBeenCalledTimes(1);
      expect(gatheringService.getMyGatheringList).toHaveBeenCalledWith({
        ...mockParams,
        offset: "10",
        limit: "10",
      });
      expect(result).toEqual(mockData);
    });

    it("offset 값이 있어도 pageParam 기준으로 재계산된다", async () => {
      const mockData = mockMyGatherings(5);
      const paramsWithOffset: IMyGatheringFilterParams = {
        sortBy: "joinedAt",
        sortOrder: "asc",
        offset: "5",
      };

      (gatheringService.getMyGatheringList as jest.Mock).mockResolvedValue(
        mockData,
      );

      const result = await fetchMyGatheringList(paramsWithOffset, 1);

      expect(gatheringService.getMyGatheringList).toHaveBeenCalledWith({
        ...paramsWithOffset,
        offset: "0",
        limit: "10",
      });
      expect(result).toEqual(mockData);
    });
  });

  describe("myGatheringQueryOptions", () => {
    it("sortBy와 sortOrder가 없을 경우 기본값을 포함한다", () => {
      const options = myGatheringQueryOptions({});
      const key = options.queryKey[1] as IMyGatheringFilterParams;

      expect(key.sortBy).toBe("dateTime");
      expect(key.sortOrder).toBe("desc");
    });

    it("queryKey에 limit과 offset이 포함된다", () => {
      const options = myGatheringQueryOptions({});
      const key = options.queryKey[1] as IMyGatheringFilterParams;

      expect(key.limit).toBe("10");
      expect(key.offset).toBe("0");
    });

    it("queryFn: pageParam 없이 호출되면 기본값 1로 동작한다", async () => {
      const mockData = mockMyGatherings(10);
      (gatheringService.getMyGatheringList as jest.Mock).mockResolvedValue(
        mockData,
      );

      const options = myGatheringQueryOptions({});
      const result = await options.queryFn({});

      expect(result).toEqual(mockData);
      expect(gatheringService.getMyGatheringList).toHaveBeenCalledWith(
        expect.objectContaining({
          offset: "0",
          limit: "10",
        }),
      );
    });

    it("getNextPageParam: 다음 페이지가 존재하면 다음 페이지 번호를 반환한다", () => {
      const { getNextPageParam } = myGatheringQueryOptions({});
      const lastPage: IMyGathering[] = mockMyGatherings(10);
      const pages: IMyGathering[][] = [mockMyGatherings(10)];

      const result = getNextPageParam(lastPage, pages);
      expect(result).toBe(2);
    });

    it("getNextPageParam: 마지막 페이지가 비어 있으면 undefined를 반환한다", () => {
      const { getNextPageParam } = myGatheringQueryOptions({});
      const lastPage: IMyGathering[] = [];
      const pages: IMyGathering[][] = [mockMyGatherings(10)];

      const result = getNextPageParam(lastPage, pages);
      expect(result).toBeUndefined();
    });

    it("queryOptions의 throwOnError와 retry 설정이 포함된다", () => {
      const options = myGatheringQueryOptions({});
      expect(options.throwOnError).toBe(true);
      expect(options.retry).toBe(false);
    });

    it("queryKey가 올바르게 설정된다", () => {
      const params: IMyGatheringFilterParams = {
        sortBy: "registrationEnd",
        sortOrder: "asc",
      };

      const options = myGatheringQueryOptions(params);
      expect(options.queryKey).toEqual([
        QUERY_KEYS.GATHERING.myList,
        expect.objectContaining({
          sortBy: "registrationEnd",
          sortOrder: "asc",
        }),
      ]);
    });
  });
});
