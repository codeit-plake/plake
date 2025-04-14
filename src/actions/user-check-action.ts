"use server";

import { IUser } from "@/types/user";
import { getCookieOfToken } from "@/utils/cookieToken";

const userCheckAction = async () => {
  const TOKEN = await getCookieOfToken();

  console.log("TOKEN", TOKEN);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auths/user`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  // 유저 정보 확인 실패
  if (!response.ok) {
    // throw new Error(await response.text());
    return {
      status: false,
      user: null,
      error: await response.text(),
    };
  }

  // 유저 정보 확인 성공 시 image null 처리
  const resUser: IUser = await response.json();
  resUser.image = resUser.image || "";

  return {
    status: true,
    user: resUser,
    error: "",
  };
};

export default userCheckAction;
