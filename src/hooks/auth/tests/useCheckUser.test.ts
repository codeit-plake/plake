import { QueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchUserId, prefetchCheckUser } from "@/hooks/auth/useCheckUser";
import authService from "@/services/auth/AuthService";
import { mockUser } from "@/utils/test-utils/userMocking";

jest.mock("@/services/auth/AuthService", () => ({
  __esModule: true,
  default: {
    getUser: jest.fn(),
  },
}));

describe("useCheckUser utils", () => {
  describe("fetchUserId", () => {
    it("authService.getUser를 호출하고 userId 문자열을 반환한다", async () => {
      (authService.getUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await fetchUserId();

      expect(authService.getUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ userId: String(mockUser.id) });
    });
  });

  describe("prefetchCheckUser", () => {
    it("queryClient.fetchQuery를 통해 fetchUserId를 호출하고 데이터를 캐싱한다", async () => {
      (authService.getUser as jest.Mock).mockResolvedValue(mockUser);
      const queryClient = new QueryClient();
      const result = await prefetchCheckUser(queryClient);

      expect(result).toEqual({ userId: String(mockUser.id) });
      expect(queryClient.getQueryData(QUERY_KEYS.AUTH.all)).toEqual(result);
    });
  });
});
