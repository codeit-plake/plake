import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { TReviewForm } from "@/schemas/reviewSchema";
import reviewService from "@/services/review/ReviewService";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: TReviewForm) => reviewService.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GATHERING.myList],
      });
    },
    onError: error => {
      console.error("모임 생성 실패:", error);
    },
  });

  const handleCreateReview = (data: TReviewForm) => {
    return mutation.mutateAsync(data);
  };

  return {
    handleCreateReview,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
