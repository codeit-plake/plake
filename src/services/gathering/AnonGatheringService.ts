import {
  IFavoriteFilterParams,
  MAX_FAVORITE_COUNT,
} from "@/constants/favorite";
import { ITEMS_PER_PAGE } from "@/constants/gatheringFilterParams";
import Service from "@/services/Service";
import {
  IGathering,
  IGatheringFilterParams,
  IParticipant,
} from "@/types/gathering";

class AnonGatheringService extends Service {
  getGatheringList(params?: Record<string, string>) {
    const convertedParams = new URLSearchParams(params).toString();

    if (convertedParams)
      return this.http.get<IGathering[]>(`/gatherings?${convertedParams}`);

    return this.http.get<IGathering[]>(`/gatherings`);
  }

  getGatheringInfiniteList(
    pageParam?: number,
    params?: IGatheringFilterParams,
  ) {
    if (!pageParam) pageParam = 1;

    const limitParams = `limit=${ITEMS_PER_PAGE}&offset=${(pageParam - 1) * 10}`;

    if (params && Object.keys(params).length !== 0) {
      const convertedParams = new URLSearchParams(params).toString();

      return this.http.get<IGathering[]>(
        `/gatherings?${convertedParams}&${limitParams}`,
      );
    } else {
      return this.http.get<IGathering[]>(`/gatherings?${limitParams}`);
    }
  }

  getFavoriteList(params: IFavoriteFilterParams) {
    const ids = params.id?.length > 0 ? params.id.join(",") : "";

    if (ids) {
      return this.http.get<IGathering[]>(
        `/gatherings?limit=${MAX_FAVORITE_COUNT}${`&id=${ids}`}`,
      );
    }
    return [];
  }

  getGatheringDetail(id: string) {
    const data = this.http.get<IGathering>(`/gatherings/${id}`);
    return data;
  }

  getGatheringParticipants(id: string) {
    const data = this.http.get<IParticipant[]>(
      `/gatherings/${id}/participants`,
    );
    return data;
  }
}

const anonGatheringService = new AnonGatheringService();

export default anonGatheringService;
