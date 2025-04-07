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

export const updateTypeOption = (paramsObj: IGatheringFilterParams) => {
  const type = paramsObj?.type;

  if (type) {
    let value = "";

    switch (type) {
      case "exercise": //인기많은순 정렬
        value = "OFFICE_STRETCHING";
        break;

      case "dining": //마감임박순 정렬
        value = "MINDFULNESS";
        break;

      case "art":
        value = "WORKATION";
        break;
    }

    paramsObj["type"] = value;
  }

  return paramsObj;
};

export const updateLocationOption = (
  pathname: string,
  paramsObj: IGatheringFilterParams,
) => {
  const location = paramsObj.location;

  if (pathname === ONLINE_PATH) {
    paramsObj["location"] = ONLINE.location;
  }

  if (location === "total") {
    delete paramsObj.location;
  }

  return paramsObj;
};

export const updateSortOption = (paramsObj: IGatheringFilterParams) => {
  const sortOption = paramsObj?.sortBy;

  let value = "";

  if (sortOption && sortOption !== "total") {
    switch (sortOption) {
      case "participantCount": //인기많은순 정렬
        value = "desc";
        break;

      case "registrationEnd": //마감임박순 정렬
        value = "asc";
        break;
    }

    paramsObj["sortOrder"] = value;
  }

  if (!value) paramsObj["sortBy"] = "dateTime";

  return paramsObj;
};

export const updateGatheringParams = (
  pathname: string,
  paramsObj: IGatheringFilterParams,
) => {
  const filteredUndefined = filterUndefined(paramsObj);

  const updatedTypeParams = updateTypeOption(filteredUndefined);

  const updatedLocationParams = updateLocationOption(
    pathname,
    updatedTypeParams,
  );

  const updatedSortParams = updateSortOption(updatedLocationParams);

  return updatedSortParams;
};
