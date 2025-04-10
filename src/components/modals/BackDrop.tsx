import { PropsWithChildren } from "react";

const BackDrop = ({
  children,
  onClose,
}: PropsWithChildren<{ onClose: () => void }>) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex min-w-[320px] items-center justify-center bg-black/50"
      onClick={handleBackgroundClick}
      data-testid="backdrop"
    >
      {children}
    </div>
  );
};

export default BackDrop;
