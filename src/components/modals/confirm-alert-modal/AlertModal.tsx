/**
 * #P601 성능: 모달 컴포넌트 지연 로딩 적용
 * #A601 접근성: ARIA 역할 및 속성 강화
 * #U601 사용자 경험: 키보드 인터랙션 개선
 */
import ConfirmAlertModalWrapper from "@/components/modals/confirm-alert-modal/ConfirmAlertModalWrapper";
import { Button } from "@/components/ui/Button";

/**
 * #T601 타입: props 인터페이스 문서화
 * #T602 타입: 콜백 함수 타입 명시적 정의
 */
interface IAlertModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

/**
 * #A602 접근성: 모달 포커스 관리 개선
 * #U602 사용자 경험: 모달 애니메이션 추가
 * #E701 에러: 콜백 함수 실행 오류 처리
 */
const AlertModal = ({
  isOpen,
  onClose,
  title,
  onConfirm,
}: IAlertModalProps) => {
  /** #E702 에러: 콜백 함수 실행 순서 보장 */
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
      <Button
        variant="purple"
        className="w-[120px]"
        onClick={handleConfirm}
        aria-label="알림 확인"
      >
        확인
      </Button>
    </ConfirmAlertModalWrapper>
  );
};

export default AlertModal;
