"use client";

import useUserStore from "@/stores/useUserStore";
import { clearCookieOfToken } from "@/utils/cookieToken";

import useFavorite from "../useFavorite";

const useLogout = () => {
  const { clearUserState } = useUserStore();
  const { setFavoriteInitValue } = useFavorite();

  const logout = () => {
    // 쿠키 삭제
    clearCookieOfToken();

    // 클라이언트 유저 상태 초기화
    clearUserState();

    // 비로그인 유저의 즐겨찾기 목록 가져오기
    setFavoriteInitValue("unknown");
  };

  return { logout };
};

export default useLogout;
