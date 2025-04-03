import { ONLINE, ONLINE_PATH } from "@/constants/gatheringFilterParams";
import { IGatheringFilterParams } from "@/types/gathering";

export const filterUndefined = (paramsObj: IGatheringFilterParams) => {
  const filterParams = Object.entries(paramsObj)
    .filter(([, value]) => value !== undefined)
    .reduce((acc, value) => {
      return { ...acc, [value[0]]: value[1] };
    }, {});

  return filterParams;
};

export const updateSortOption = (paramsObj: IGatheringFilterParams) => {
  const sortOption = paramsObj.sortBy;

  if (sortOption) {
    let order = "";

    switch (sortOption) {
      case "participantCount": //인기많은순 정렬
        order = "desc";
        break;

      case "registrationEnd": //마감임박순 정렬
        order = "asc";
        break;
    }

    paramsObj["sortOrder"] = order;
  } else {
    paramsObj["sortBy"] = "dateTime";
  }

  return paramsObj;
};

export const updateGatheringParams = (
  pathname: string,
  paramsObj: IGatheringFilterParams,
) => {
  const location = paramsObj.location;

  if (pathname === ONLINE_PATH) {
    paramsObj["location"] = ONLINE.location;
  }

  if (location === "전체") {
    delete paramsObj.location;
  }

  const filteredUndefined = filterUndefined(paramsObj);

  const updatedSortParams = updateSortOption(filteredUndefined);

  return updatedSortParams;
};
