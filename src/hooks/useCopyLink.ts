import { usePathname } from "next/navigation";
import { useState } from "react";

const useCopyLink = () => {
  const pathname = usePathname();
  const [copyError, setCopyError] = useState<Error | null>(null);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);
      setCopyError(null);
    } catch (error) {
      console.error("링크 복사 실패", error);
      if (error instanceof Error) {
        setCopyError(error);
      } else {
        setCopyError(new Error("알 수 없는 오류가 발생했습니다"));
      }
    }
  };

  return { handleCopyLink, copyError };
};

export default useCopyLink;
