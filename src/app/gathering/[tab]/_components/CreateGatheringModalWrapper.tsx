"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/Button";
import useModalStore from "@/stores/useModalStore";
import useUserStore from "@/stores/useUserStore";

const CreateGatheringModalWrapper = () => {
  const router = useRouter();
  const { openConfirm, openCreateGathering } = useModalStore(
    useShallow(state => ({
      openConfirm: state.openConfirm,
      openCreateGathering: state.openCreateGathering,
    })),
  );
  const user = useUserStore(state => state.user);

  const onClickButton = () => {
    if (user) openCreateGathering();
    else {
      openConfirm(
        "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?",
        () => router.replace("/login"),
      );
    }
  };

  return (
    <>
      <Button
        variant="purple"
        className="h-10 w-[94px] md:h-11 md:w-28"
        onClick={onClickButton}
      >
        모임 만들기
      </Button>
    </>
  );
};

export default CreateGatheringModalWrapper;
