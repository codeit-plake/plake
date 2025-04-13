import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import FetchBoundary from "@/components/boundary/FetchBoundary";
import MainCarouselSkeleton from "@/components/skeletons/MainCarouselSkeleton";
import { popularGatheringsQueryOption } from "@/hooks/gathering/usePopularGatherings";
import { upcomingGatheringsQueryOption } from "@/hooks/gathering/useUpcomingGatherings";

import PopularCarousel from "./PopularCarousel";
import UpcomingCarousel from "./UpcomingCarousel";

const MainCarouselContainer = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(popularGatheringsQueryOption()),
    queryClient.prefetchQuery(upcomingGatheringsQueryOption()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-20">
        <FetchBoundary fallback={<MainCarouselSkeleton />}>
          <PopularCarousel />
        </FetchBoundary>
        <FetchBoundary fallback={<MainCarouselSkeleton />}>
          <UpcomingCarousel />
        </FetchBoundary>
      </section>
    </HydrationBoundary>
  );
};

export default MainCarouselContainer;
