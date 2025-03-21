import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import FetchBoundary from "@/components/boundary/FetchBoundary";
import { prefetchDeadlineImminentGatherings } from "@/hooks/gathering/useDeadlineImminentGatherings";
import { prefetchPopularGatherings } from "@/hooks/gathering/usePopularGatherings";

import DeadLineCarousel from "./DeadLineCarousel";
import PopularCarousel from "./PopularCarousel";

const MainCarouselContainer = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    prefetchPopularGatherings(queryClient),
    prefetchDeadlineImminentGatherings(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-20">
        <FetchBoundary
          fallback={
            <div className="h-[100px] w-full bg-red-500">Loading...</div>
          }
        >
          <PopularCarousel />
        </FetchBoundary>
        <FetchBoundary
          fallback={
            <div className="h-[100px] w-full bg-red-500">Loading...</div>
          }
        >
          <DeadLineCarousel />
        </FetchBoundary>
      </section>
    </HydrationBoundary>
  );
};

export default MainCarouselContainer;
