"use server";

import { setCookieOfToken } from "@/utils/cookieToken";

import userCheckAction from "./user-check-action";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const userSignInAction = async (_: any, formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const userData = { email, password };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auths/signin`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // 로그인 실패
  if (!response.ok) {
    // throw new Error(await response.text());
    return {
      status: false,
      error: await response.text(),
      user: null,
    };
  }

  // 성공시 쿠키에 토큰 저장
  const res = await response.json();
  await setCookieOfToken(res.token);

  await new Promise(resolve => setTimeout(resolve, 500));

  // 로그인 성공 시 유저 정보 확인
  const state = await userCheckAction();

  console.log(state);
  return state;
};

export default userSignInAction;
