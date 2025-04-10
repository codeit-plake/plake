"use client";

import React, { useEffect, useState } from "react";

import Avatar from "@/components/common/Avatar";
import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { IUser } from "@/types/user";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAvatarImage(URL.createObjectURL(file));
    }
  };

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
            <label htmlFor="image-upload" className="relative cursor-pointer">
              <Avatar size="large" type="editable" imgPath={avatarImage} />
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg, image/png, image/gif, image/webp"
                className="hidden"
                onChange={handleImageChange}
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
          />

          <Input
            label="이메일"
            labelCustom="block text-base mb-3"
            type="email"
            id="email"
            value={user.email}
            disabled
          />

          <div className="flex gap-4">
            <Button
              variant="purple-outline"
              className="h-[44px] w-full"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              variant="purple"
              className="h-[44px] w-full"
              onClick={handleSubmit}
              disabled={!companyName}
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
