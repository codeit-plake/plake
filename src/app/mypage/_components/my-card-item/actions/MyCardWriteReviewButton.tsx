"use client";

import CreateReviewModal from "@/components/modals/create-review-modal/CreateReviewModal";
import { Button } from "@/components/ui/Button";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";
import { useModal } from "@/hooks/useModal";

const MyCardWriteReviewButton = ({ id }: { id: number }) => {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Button
        variant="purple"
        className="h-10 w-fit"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }}
      >
        {MY_CARD_ACTION_TEXT.WRITE_REVIEW}
      </Button>
      <CreateReviewModal
        isOpen={isOpen}
        onClose={onClose}
        type="createReview"
        reviewTargetId={id}
      />
    </>
  );
};

export default MyCardWriteReviewButton;
