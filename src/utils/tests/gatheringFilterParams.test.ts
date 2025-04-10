import {
  filterUndefined,
  updateGatheringParams,
  updateLocationOption,
  updateSortOption,
  updateTypeOption,
} from "../gatheringFilterParams";

describe("filterUndefined 테스트", () => {
  it("paramsObj에 undeinfed value가 있는 경우 해당 key는 필터링된다.", () => {
    expect(
      filterUndefined({ sortBy: undefined, type: "exercise" }),
    ).toStrictEqual({ type: "exercise" });
  });
});

describe("updateTypeOption 테스트", () => {
  it("type이 존재한다면 type의 value가 조건에 맞게 변환된다.", () => {
    expect(updateTypeOption({ type: "exercise" })).toStrictEqual({
      type: "OFFICE_STRETCHING",
    });
    expect(updateTypeOption({ type: "dining" })).toStrictEqual({
      type: "MINDFULNESS",
    });
    expect(updateTypeOption({ type: "art" })).toStrictEqual({
      type: "WORKATION",
    });
  });

  it("존재하지 않은 type option이라면 type params key는 삭제된다.", () => {
    expect(updateTypeOption({ type: "cooking" })).toStrictEqual({});
  });
});

describe("updateLocationOption 테스트", () => {
  it("Pathname이 /gathering/online일 경우 params에 location이 추가된다.", () => {
    expect(updateLocationOption("/gathering/online", {})).toStrictEqual({
      location: "홍대입구",
    });
  });

  it("location이 total일 경우 params에 location이 삭제된다.", () => {
    expect(
      updateLocationOption("/gathering/offline", { location: "total" }),
    ).toStrictEqual({});
  });

  it("존재하지 않은 location option이라면 location params key는 삭제된다.", () => {
    expect(updateTypeOption({ type: "cooking" })).toStrictEqual({});
  });
});

describe("updateSortOption 테스트", () => {
  it("sortOption이 존재하고 sortOption이 total이 아니라면", () => {
    expect(updateSortOption({ sortBy: "participantCount" })).toStrictEqual({
      sortBy: "participantCount",
      sortOrder: "desc",
    });
    expect(updateSortOption({ sortBy: "registrationEnd" })).toStrictEqual({
      sortBy: "registrationEnd",
      sortOrder: "asc",
    });
  });

  it("sortOption이 존재하지 않으면 기본적으로 sortBy key가 생성된다.", () => {
    expect(updateSortOption({})).toStrictEqual({
      sortBy: "dateTime",
    });
  });
});

describe("updateGatheringParams 테스트", () => {
  it("온라인 경로이고 params에 설정된 key의 값이 전부 undefined인 경우", () => {
    expect(
      updateGatheringParams("/gathering/offline", {
        location: undefined,
        date: undefined,
        sort: undefined,
        type: undefined,
      }),
    ).toStrictEqual({
      sortBy: "dateTime",
    });
  });
  it("온라인 경로이고 params에 설정된 key의 값이 존재하는 경우", () => {
    expect(
      updateGatheringParams("/gathering/online", {
        date: "2025-04-10",
        sortBy: "registrationEnd",
        type: undefined,
      }),
    ).toStrictEqual({
      location: "홍대입구",
      sortBy: "registrationEnd",
      sortOrder: "asc",
      date: "2025-04-10",
    });
  });

  it("오프라인 경로이고 params에 설정된 key의 값이 전부 undefined인 경우", () => {
    expect(
      updateGatheringParams("/gathering/offline", {
        location: undefined,
        date: undefined,
        sort: undefined,
        type: undefined,
      }),
    ).toStrictEqual({
      sortBy: "dateTime",
    });
  });

  it("오프라인 경로이고 params에 설정된 key의 값이 존재하는 경우", () => {
    expect(
      updateGatheringParams("/gathering/online", {
        location: undefined,
        date: "2025-03-09",
        sortBy: "participantCount",
        type: "dining",
      }),
    ).toStrictEqual({
      location: "홍대입구",
      date: "2025-03-09",
      sortBy: "participantCount",
      sortOrder: "desc",
      type: "MINDFULNESS",
    });
  });
});
