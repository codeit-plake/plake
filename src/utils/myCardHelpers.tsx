import React from "react";
import { FaCheck } from "react-icons/fa6";

import { IMyGathering, MyCardActionType, StatusProps } from "@/types/gathering";

export const getStatusProps = (gathering: IMyGathering): StatusProps[] => {
  if (gathering.isCompleted) {
    return [
      {
        label: "이용 완료",
        className: "bg-gray-100 text-gray-500",
      },
    ];
  }

  if (gathering.participantCount >= 5) {
    return [
      {
        label: "이용 예정",
        className: "bg-purple-100 text-purple-600",
      },
      {
        label: "개설 확정",
        className: "border border-purple-200 text-purple-500",
        icon: <FaCheck size={12} />,
      },
    ];
  }

  return [
    {
      label: "이용 예정",
      className: "bg-purple-100 text-purple-600",
    },
    {
      label: "개설 대기",
      className: "border border-gray-200 text-gray-500",
    },
  ];
};

export const getButtonType = (gathering: IMyGathering): MyCardActionType => {
  // if (!gathering.isCompleted) {
  //   return "cancel";
  // }

  if (gathering.isReviewed) {
    return "viewReview";
  }

  return "writeReview";
};
