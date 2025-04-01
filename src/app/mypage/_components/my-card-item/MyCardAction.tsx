"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useLeaveGatheringMutation } from "@/hooks/gathering/useJoinGathering";
import useModalStore from "@/stores/useModalStore";

type MyCardActionType = "cancel" | "viewReview" | "writeReview";

interface MyCardActionProps {
  type: MyCardActionType;
  id: number;
}

const MyCardAction = ({ type, id }: MyCardActionProps) => {
  const router = useRouter();
  const { mutate: leave } = useLeaveGatheringMutation(String(id), [
    QUERY_KEYS.GATHERING.myList,
  ]);
  const openConfirm = useModalStore(state => state.openConfirm);
  const openCreateReview = useModalStore(state => state.openCreateReview);

  if (type === "cancel") {
    return (
      <Button
        variant="purple-outline"
        className="h-10 w-fit"
        onClick={e => {
          e.preventDefault();
          openConfirm("참여를 취소하시겠습니까?", () => {
            leave();
          });
        }}
      >
        예약 취소하기
      </Button>
    );
  }

  if (type === "viewReview") {
    return (
      <Button
        variant="purple"
        className="h-10 w-fit"
        onClick={e => {
          e.preventDefault();
          router.push("/mypage/reviews?type=written");
        }}
      >
        내가 쓴 리뷰 보기
      </Button>
    );
  }

  return (
    <Button
      variant="purple"
      className="h-10 w-fit"
      onClick={e => {
        e.preventDefault();
        openCreateReview(id);
      }}
    >
      리뷰 작성하기
    </Button>
  );
};

export default MyCardAction;
