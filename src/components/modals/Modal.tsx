"use client";

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

import BackDrop from "@/components/modals/BackDrop";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "default" | "alert" | "mobileFull";
  title?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  title,
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !isMounted) return null;

  return createPortal(
    <BackDrop onClose={onClose}>
      <div
        className={clsx("relative w-full bg-white p-6", {
          "mx-4 max-w-[520px] rounded-lg": variant === "default",
          "mx-9 max-w-[450px] rounded-lg": variant === "alert",
          "h-full w-full sm:h-auto sm:w-[520px] sm:rounded-lg":
            variant === "mobileFull",
        })}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={clsx(
            "mb-5 flex",
            title ? "items-center justify-between" : "justify-end",
          )}
        >
          {title && (
            <h2 className="text-base font-bold text-gray-900 md:text-lg">
              {title}
            </h2>
          )}
          <button className="text-gray-700" onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>
        {children}
      </div>
    </BackDrop>,
    document.getElementById("modal-root")!,
  );
};

export default Modal;
