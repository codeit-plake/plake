import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import ConfirmModal from "@/components/modals/confirm-alert-modal/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { useJoinGatheringMutation } from "@/hooks/gathering/useJoinGathering";
import { useLeaveGatheringMutation } from "@/hooks/gathering/useLeaveGathering";
import { useModal } from "@/hooks/useModal";

const ALERT_MESSAGE = {
  join: {
    success: "모임에 참여되었습니다.",
    error: "모임에 참여에 실패했습니다.\n잠시 후 다시 시도해주세요.",
  },
  leave: {
    success: "모임에서 나갔습니다.",
    error: "모임에서 나가는데 실패했습니다.\n잠시 후 다시 시도해주세요.",
  },
};

interface IConfirmModalConfig {
  title: string;
  onConfirm: () => void;
}

interface IParticipantButtonsProps {
  id: string;
  isParticipant: boolean;
  currentUserId?: number;
}

const ParticipantButtons = ({
  id,
  isParticipant,
  currentUserId,
}: IParticipantButtonsProps) => {
  const router = useRouter();
  const {
    isOpen: isConfirmOpen,
    onClose: closeConfirm,
    onOpen: openConfirm,
  } = useModal();
  const {
    isOpen: isAlertOpen,
    onClose: closeAlert,
    onOpen: openAlert,
  } = useModal();

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalConfig, setConfirmModalConfig] =
    useState<IConfirmModalConfig>({
      title: "",
      onConfirm: () => {},
    });

  const { mutate: onJoin, status: joinStatus } = useJoinGatheringMutation(id);
  const { mutate: onLeave, status: leaveStatus } =
    useLeaveGatheringMutation(id);

  const handleMutationStatus = useCallback(
    (
      status: "success" | "error" | "idle" | "pending",
      type: "join" | "leave",
    ) => {
      if (status === "success" || status === "error") {
        setAlertMessage(ALERT_MESSAGE[type][status]);
        openAlert();
      }
    },
    [openAlert],
  );

  useEffect(() => {
    handleMutationStatus(joinStatus, "join");
  }, [joinStatus, handleMutationStatus]);

  useEffect(() => {
    handleMutationStatus(leaveStatus, "leave");
  }, [leaveStatus, handleMutationStatus]);

  const handleJoinClick = () => {
    if (!currentUserId) {
      setConfirmModalConfig({
        title:
          "로그인이 필요한 서비스입니다\n로그인 페이지로 이동하시겠습니까?",
        onConfirm: () => {
          router.push("/login");
        },
      });
    } else {
      setConfirmModalConfig({
        title: "모임에 참여하시겠습니까?",
        onConfirm: () => {
          onJoin();
          closeConfirm();
        },
      });
    }
    openConfirm();
  };

  const handleLeaveClick = () => {
    setConfirmModalConfig({
      title: "모임에서 나가시겠습니까?",
      onConfirm: () => {
        onLeave();
        closeConfirm();
      },
    });
    openConfirm();
  };

  const handleConfirmClose = () => {
    setConfirmModalConfig({
      title: "",
      onConfirm: () => {},
    });
    closeConfirm();
  };

  const handleAlertClose = () => {
    setAlertMessage("");
    closeAlert();
  };

  return (
    <>
      {isParticipant ? (
        <Button
          onClick={handleLeaveClick}
          variant="purple-outline"
          disabled={leaveStatus === "pending"}
        >
          {"참여 취소하기"}
        </Button>
      ) : (
        <Button
          onClick={handleJoinClick}
          variant="purple"
          disabled={joinStatus === "pending"}
        >
          {"참여하기"}
        </Button>
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={handleConfirmClose}
          title={confirmModalConfig.title}
          onConfirm={() => {
            confirmModalConfig.onConfirm();
            handleConfirmClose();
          }}
        />
      )}

      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={handleAlertClose}
          onConfirm={() => {}}
          title={alertMessage}
        />
      )}
    </>
  );
};

export default ParticipantButtons;
