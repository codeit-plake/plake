"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";

const MyCardViewReviewButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="purple"
      className="h-10 w-fit"
      onClick={e => {
        e.preventDefault();
        router.push("/mypage/reviews?type=written");
      }}
    >
      {MY_CARD_ACTION_TEXT.VIEW_REVIEW}
    </Button>
  );
};

export default MyCardViewReviewButton;
