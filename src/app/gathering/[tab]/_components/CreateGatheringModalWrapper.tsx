"use client";

/**
 * #P301 성능: 모달 컴포넌트 지연 로딩 적용
 * #T301 타입: Zustand 스토어 타입 안정성 강화
 * #U301 사용자 경험: 모달 애니메이션 개선
 */
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

import ConfirmModal from "@/components/modals/confirm-alert-modal/ConfirmModal";
import CreateGatheringModal from "@/components/modals/create-gathering-modal/CreateGatheringModal";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks/useModal";
import useUserStore from "@/stores/useUserStore";

/**
 * #A301 접근성: 모달 키보드 탐색 및 포커스 관리 개선
 * #U302 사용자 경험: 모달 외부 클릭 시 확인 프롬프트 추가
 * #E401 에러: 로그인 상태 변경 시 에러 처리
 */
const CreateGatheringModalWrapper = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useModal();
  const user = useUserStore(state => state.user);

  return (
    <>
      {/**
       * #A302 접근성: 반응형 레이아웃에서 버튼 레이블 관리
       * #U303 사용자 경험: 버튼 호버/포커스 상태 개선
       */}
      <Button
        variant="purple"
        className="h-10 w-10 rounded-full md:h-11 md:w-28 md:rounded-xl"
        onClick={onOpen}
        aria-label="모임 만들기"
      >
        <FaPlus className="md:hidden" aria-hidden="true" />
        <span className="hidden md:block">모임 만들기</span>
      </Button>
      {/**
       * #U304 사용자 경험: 모달 전환 애니메이션 추가
       * #A303 접근성: 모달 ARIA 속성 및 역할 개선
       */}
      {user ? (
        <CreateGatheringModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <ConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          title={`로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?`}
          onConfirm={() => router.replace("/login")}
        />
      )}
    </>
  );
};

export default CreateGatheringModalWrapper;
