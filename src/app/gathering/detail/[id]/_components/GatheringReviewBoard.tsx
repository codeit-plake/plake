"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import Pagination from "@/components/ui/Pagination";
import { reviewsByGatheringIdQueryOption } from "@/hooks/review/useReviewsByGatheringId";
import { useScrollToTopOnValueChange } from "@/hooks/useScrollToTopOnValueChange";

import GatheringReviewList from "./GatheringReviewList";

interface IGatheringReviewBoardProps {
  id: string;
}

const GatheringReviewBoard = ({ id }: IGatheringReviewBoardProps) => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    reviewsByGatheringIdQueryOption(id),
  );
  const [currentPage, setCurrentPage] = useState(data.pages[0].currentPage);

  useScrollToTopOnValueChange(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <section className="flex h-full min-h-[60vh] flex-col gap-10 border-t-2 border-gray-200 bg-white p-6 pb-28 md:pb-20">
      <GatheringReviewList reviews={data.pages[0].data} />
      <Pagination
        totalPage={data.pages[0].totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default GatheringReviewBoard;
