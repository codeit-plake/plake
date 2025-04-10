"use client";

import MyCardCancelButton from "@/app/mypage/_components/my-card-item/actions/MyCardCancelButton";
import MyCardViewReviewButton from "@/app/mypage/_components/my-card-item/actions/MyCardViewReviewButton";
import MyCardWriteReviewButton from "@/app/mypage/_components/my-card-item/actions/MyCardWriteReviewButton";
import { MyCardActionType } from "@/types/gathering";

interface MyCardActionGroupProps {
  type: MyCardActionType;
  id: number;
}

const MyCardActionGroup = ({ type, id }: MyCardActionGroupProps) => {
  const actionMap: Record<MyCardActionType, React.ReactNode> = {
    cancel: <MyCardCancelButton id={id} />,
    viewReview: <MyCardViewReviewButton />,
    writeReview: <MyCardWriteReviewButton id={id} />,
  };

  return actionMap[type] ?? null;
};

export default MyCardActionGroup;
