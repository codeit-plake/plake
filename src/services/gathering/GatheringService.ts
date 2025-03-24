import { CreateGatheringFormType } from "@/schemas/gatheringSchema";
import Service from "@/services/Service";
import { IGathering } from "@/types/gathering";
// import { getCookieOfToken } from "@/utils/cookieToken";

class GatheringService extends Service {
  constructor(token?: string) {
    super();
    this.setToken(token || "");
  }

  getGatheringList() {
    const data = this.http.get<IGathering[]>("/gatherings");
    return data;
  }
  getGatheringDetail(id: string) {
    const data = this.http.get<IGathering>(`/gatherings/${id}`);
    return data;
  }
  createGathering(formData: CreateGatheringFormType) {
    this.http.post("/gatherings", formData);
  }
  deleteGathering(id: string) {
    this.http.put(`/gatherings/${id}/cancel`);
  }
  joinGathering(id: string) {
    this.http.post(`/gatherings/${id}/join`);
  }
  leaveGathering(id: string) {
    this.http.delete(`/gatherings/${id}/leave`);
  }
}

export const createGatheringService = async () => {
  // const token = await getCookieOfToken();
  return new GatheringService(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIzMTQiLCJ1c2VySWQiOjE2NjcsImlhdCI6MTc0MjgwMjM0MCwiZXhwIjoxNzQyODA1OTQwfQ.Nv1pegdHehEWI9Ce2TJOPIaplxvX7VDTzpx904anDdk",
  );
};

const gatheringService = new GatheringService();

export default gatheringService;
