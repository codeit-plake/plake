"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { checkAuthToken } from "@/hooks/auth/useCheckToken";
import useLogout from "@/hooks/auth/useLogout";
import useModalStore from "@/stores/useModalStore";
import useUserStore from "@/stores/useUserStore";

const ProtectedRoute = () => {
  const router = useRouter();
  const { logout } = useLogout();
  const { openAlert } = useModalStore();
  const { isLoggedIn } = useUserStore();
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    openAlert("로그인이 필요한 서비스입니다.\n로그인 후 이용해주세요.");
    logout();
    router.replace("/login");
  };

  // 컴포넌트 마운트 시 즉시 토큰 확인
  useEffect(() => {
    const initialCheck = async () => {
      await checkAuthToken(handleLogout);
    };

    initialCheck();

    // 10분마다 토큰 체크
    checkIntervalRef.current = setInterval(async () => {
      await checkAuthToken(handleLogout);
    }, 600000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로그인 상태 변경 감지
  useEffect(() => {
    if (!isLoggedIn) {
      const checkToken = async () => {
        await checkAuthToken(handleLogout);
      };
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return null;
};

export default ProtectedRoute;
