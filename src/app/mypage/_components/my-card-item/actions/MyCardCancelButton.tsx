"use client";

import ConfirmModal from "@/components/modals/confirm-alert-modal/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { MY_CARD_ACTION_TEXT } from "@/constants/ui";
import { useLeaveGatheringMutation } from "@/hooks/gathering/useJoinGathering";
import { useModal } from "@/hooks/useModal";

const MyCardCancelButton = ({ id }: { id: number }) => {
  const { isOpen, onClose, onOpen } = useModal();
  const { mutate: leave } = useLeaveGatheringMutation(String(id), [
    QUERY_KEYS.GATHERING.myList,
  ]);

  return (
    <>
      <Button
        variant="purple-outline"
        className="h-10 w-fit"
        onClick={e => {
          e.preventDefault();
          onOpen();
        }}
      >
        {MY_CARD_ACTION_TEXT.CANCEL}
      </Button>
      <ConfirmModal
        title="참여를 취소하시겠습니까?"
        onConfirm={() => leave()}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default MyCardCancelButton;
