/**
 * #P1001 성능: 이미지 업로드 최적화
 * #T1001 타입: 프로필 수정 폼 타입 안정성 강화
 * #A1001 접근성: 모달 키보드 탐색 개선
 */
"use client";

import React, { useEffect, useState } from "react";

import Avatar from "@/components/common/Avatar";
import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { IUser } from "@/types/user";

/**
 * #T1002 타입: props 인터페이스 문서화
 * #T1003 타입: 콜백 함수 타입 명시적 정의
 */
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

/**
 * #P1002 성능: 상태 업데이트 최적화
 * #U1001 사용자 경험: 이미지 업로드 피드백 개선
 * #E1101 에러: 이미지 업로드 실패 처리
 */
const EditProfileModal = ({ isOpen, onClose, user }: EditProfileModalProps) => {
  const [companyName, setCompanyName] = useState(user.companyName);
  const [avatarImage, setAvatarImage] = useState(user.image); // UI 미리보기 용 이미지 URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { handleUpdateUser, errorMessage, isAlertOpen, onCloseAlert } =
    useUpdateUser();

  useEffect(() => {
    if (isOpen) {
      setCompanyName(user.companyName);
      setAvatarImage(user.image);
      setSelectedFile(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  /**
   * #S1001 보안: 이미지 파일 검증
   * #E1102 에러: 파일 선택 취소 처리
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  /**
   * #S1002 보안: 폼 데이터 검증
   * #E1103 에러: 서버 응답 에러 처리
   */
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("companyName", companyName);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    handleUpdateUser(formData);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="프로필 수정하기">
        <div className="mt-1 flex flex-col gap-6">
          <div className="w-[56px]">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer"
              role="button"
              aria-label="프로필 이미지 업로드"
            >
              <Avatar size="large" type="editable" imgPath={avatarImage} />
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg, image/png, image/gif, image/webp"
                className="hidden"
                onChange={handleImageChange}
                aria-label="프로필 이미지 선택"
              />
            </label>
          </div>

          <Input
            label="회사"
            labelCustom="block text-base mb-3"
            type="text"
            id="companyName"
            placeholder="회사를 입력해주세요"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            aria-required="true"
          />

          <Input
            label="이메일"
            labelCustom="block text-base mb-3"
            type="email"
            id="email"
            value={user.email}
            disabled
            aria-label="이메일 (수정 불가)"
          />

          <div className="flex gap-4">
            <Button
              variant="purple-outline"
              className="h-[44px] w-full"
              onClick={onClose}
              aria-label="프로필 수정 취소"
            >
              취소
            </Button>
            <Button
              variant="purple"
              className="h-[44px] w-full"
              onClick={handleSubmit}
              disabled={!companyName}
              aria-label="프로필 수정 완료"
            >
              수정하기
            </Button>
          </div>
        </div>
      </Modal>
      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={onCloseAlert}
          title={errorMessage}
        />
      )}
    </>
  );
};

export default EditProfileModal;
