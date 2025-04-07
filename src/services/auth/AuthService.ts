import { ApiRouteService } from "@/services/Service";
import { IUpdateUser, IUser } from "@/types/user";

class AuthService extends ApiRouteService {
  async getUser(): Promise<IUser> {
    return this.http.get("/auths/user");
  }

  async updateUser(formData: FormData): Promise<IUpdateUser> {
    return this.http.put("/auths/user", formData);
  }
}

const authService = new AuthService();

export default authService;
