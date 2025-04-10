import ConfirmAlertModalWrapper from "@/components/modals/confirm-alert-modal/ConfirmAlertModalWrapper";
import { Button } from "@/components/ui/Button";

interface IConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: IConfirmModalProps) => {
  return (
    <ConfirmAlertModalWrapper
      type="confirm"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <Button variant="purple-outline" className="w-[120px]" onClick={onClose}>
        취소
      </Button>
      <Button
        variant="purple"
        className="w-[120px]"
        onClick={() => onConfirm()}
      >
        확인
      </Button>
    </ConfirmAlertModalWrapper>
  );
};

export default ConfirmModal;
