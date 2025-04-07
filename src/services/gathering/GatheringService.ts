import { ApiRouteService } from "@/services/Service";
import {
  IGathering,
  IMyGathering,
  IMyGatheringFilterParams,
} from "@/types/gathering";

class GatheringService extends ApiRouteService {
  async createGathering(
    formData: FormData,
  ): Promise<Omit<IGathering, "canceledAt">> {
    return this.http.post("/gatherings", formData);
  }

  async joinGathering(id: string) {
    return this.http.post(`/gatherings/${id}/join`);
  }

  async deleteGathering(id: string) {
    return this.http.put(`/gatherings/${id}/cancel`);
  }

  async leaveGathering(id: string) {
    return this.http.delete(`/gatherings/${id}/leave`);
  }

  async getMyGatheringList(searchParams?: IMyGatheringFilterParams) {
    const paramStr = new URLSearchParams(
      (searchParams ?? {}) as Record<string, string>,
    ).toString();
    return this.http.get<IMyGathering[]>(
      `/gatherings/joined${paramStr && `?${paramStr}`}`,
    );
  }
}

const gatheringService = new GatheringService();

export default gatheringService;
