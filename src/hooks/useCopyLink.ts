import { usePathname } from "next/navigation";

import useModalStore from "@/stores/useModalStore";

const useCopyLink = () => {
  const pathname = usePathname();
  const openAlert = useModalStore(state => state.openAlert);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);
      openAlert("링크가 복사되었습니다.");
    } catch (error) {
      console.error("링크 복사 실패", error);
      openAlert("링크 복사에 실패했습니다.\n다시 시도해주세요.");
    }
  };

  return { handleCopyLink };
};

export default useCopyLink;
