import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import FetchBoundary from "@/components/boundary/FetchBoundary";
import MainCardList from "@/components/layout/MainCardList";
import MainCardListSkeleton from "@/components/skeletons/MainCardListSkeleton";
import { prefetchGateringInfiniteList } from "@/hooks/gathering/useGatheringInfiniteList";
import { MainTab, MainTabSchema } from "@/types/gathering/main-tab";
import { updateGatheringParams } from "@/utils/gatheringFilterParams";

type PageProps = {
  params: {
    tab: MainTab;
    location: string;
    date: string;
    sort: string;
    type: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { tab, location, date, sort, type } = params;

  const headersList = headers(); //custom x-url header
  const headerPathname = headersList.get("x-pathname") || "";

  const queryClient = new QueryClient();

  try {
    MainTabSchema.parse(tab);
  } catch {
    notFound();
  }

  const filteredParams = updateGatheringParams(headerPathname, {
    location,
    date,
    sort,
    type,
  });

  await prefetchGateringInfiniteList(queryClient, tab, filteredParams);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FetchBoundary fallback={<MainCardListSkeleton />}>
        <MainCardList tab={tab} />
      </FetchBoundary>
    </HydrationBoundary>
  );
};

export default Page;
