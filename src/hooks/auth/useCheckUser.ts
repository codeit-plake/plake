import { type QueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import authService from "@/services/auth/AuthService";

export const fetchUserId = async () => {
  const user = await authService.getUser();
  return { userId: String(user.id) };
};

export const prefetchCheckUser = async (queryClient: QueryClient) => {
  return queryClient.fetchQuery({
    queryKey: QUERY_KEYS.AUTH.all,
    queryFn: fetchUserId,
  });
};
