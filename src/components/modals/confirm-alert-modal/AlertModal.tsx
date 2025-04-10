import ConfirmAlertModalWrapper from "@/components/modals/confirm-alert-modal/ConfirmAlertModalWrapper";
import { Button } from "@/components/ui/Button";

interface IAlertModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const AlertModal = ({
  isOpen,
  onClose,
  title,
  onConfirm,
}: IAlertModalProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <ConfirmAlertModalWrapper
      type="alert"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <Button variant="purple" className="w-[120px]" onClick={handleConfirm}>
        확인
      </Button>
    </ConfirmAlertModalWrapper>
  );
};

export default AlertModal;
