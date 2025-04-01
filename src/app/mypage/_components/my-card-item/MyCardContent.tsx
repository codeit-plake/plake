import clsx from "clsx";
import { ReactNode } from "react";

interface MyCardContentProps {
  hasAction: boolean;
  children: ReactNode;
}

const MyCardContent = ({ children }: MyCardContentProps) => {
  return (
    <div
      className={clsx(
        "flex h-full min-w-0 flex-col justify-between gap-4 sm:h-auto sm:flex-1",
      )}
    >
      {children}
    </div>
  );
};

export default MyCardContent;
