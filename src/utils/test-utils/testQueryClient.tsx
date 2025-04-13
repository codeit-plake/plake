import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "@tanstack/react-query";

export const getMockContext = <TKey extends readonly unknown[]>(
  queryKey: TKey,
  options?: { pageParam?: number },
): QueryFunctionContext<TKey, number> => {
  return {
    queryKey,
    signal: new AbortController().signal,
    client: testQueryClient(),
    meta: undefined,
    pageParam: options?.pageParam ?? 1,
    direction: "forward",
  };
};

export const mockInvalidateQueries = jest.fn();

export const testQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  jest
    .spyOn(queryClient, "invalidateQueries")
    .mockImplementation(mockInvalidateQueries);

  return queryClient;
};

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = testQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
