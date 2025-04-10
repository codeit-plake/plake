"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

import Modal from "@/components/modals/Modal";

interface IConfirmAlertModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  type: "confirm" | "alert";
}

const ConfirmAlertModalWrapper = ({
  isOpen,
  onClose,
  title,
  type,
  children,
}: PropsWithChildren<IConfirmAlertModalProps>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="alert">
      <div className="flex w-full flex-col items-center gap-6">
        <p className="whitespace-pre-wrap text-center text-sm font-medium text-gray-900 md:text-base">
          {title}
        </p>
        <div
          className={clsx(
            "flex w-full gap-2",
            type === "alert" && "justify-end",
            type === "confirm" && "justify-center",
          )}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmAlertModalWrapper;
