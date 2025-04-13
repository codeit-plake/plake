import { useState } from "react";

import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import ConfirmModal from "@/components/modals/confirm-alert-modal/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { useCancelGathering } from "@/hooks/gathering/useCancelGathering";
import useCopyLink from "@/hooks/useCopyLink";
import { useModal } from "@/hooks/useModal";

interface IOrganizerButtonsProps {
  id: string;
  isRegistrationEnd: boolean;
}

const OrganizerButtons = ({
  id,
  isRegistrationEnd,
}: IOrganizerButtonsProps) => {
  const { isOpen, onClose, onOpen } = useModal();
  const [modalType, setModalType] = useState<"cancel" | "copy" | null>(null);

  const { mutate: handleCancelGathering, isError: isCancelError } =
    useCancelGathering(id);
  const { handleCopyLink, isCopyError } = useCopyLink();

  const openModal = (type: "cancel" | "copy") => {
    setModalType(type);
    onOpen();
  };

  const onClickCopyLink = () => {
    handleCopyLink();
    openModal("copy");
  };

  return (
    <div className="flex gap-2">
      {!isRegistrationEnd && (
        <Button onClick={() => openModal("cancel")} variant="purple-outline">
          {"취소하기"}
        </Button>
      )}
      <Button variant="purple" onClick={onClickCopyLink}>
        {"공유하기"}
      </Button>
      {modalType === "cancel" &&
        (isCancelError || isCopyError ? (
          <AlertModal
            title="잠시 후 다시 시도해주세요."
            isOpen={isOpen}
            onClose={onClose}
          />
        ) : (
          <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleCancelGathering}
            title="정말 모임을 취소하시겠습니까?"
          />
        ))}

      {modalType === "copy" && (
        <AlertModal
          isOpen={isOpen}
          onClose={onClose}
          title="링크가 복사되었습니다."
        />
      )}
    </div>
  );
};

export default OrganizerButtons;
