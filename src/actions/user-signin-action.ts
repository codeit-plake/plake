"use server";

import userCheckAction from "./user-check-action";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const userSignInAction = async (_: any, formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const userData = { email, password };

  try {
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

    // 토큰 받아오기 실패
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const res = await response.json();

    // 유저 정보 확인
    const state = await userCheckAction(res.token);

    // 성공시 유저 정보 반환
    return state;
  } catch (err) {
    return {
      status: false,
      error: `${(err as Error).message}`,
      user: null,
      token: null,
    };
  }
};

export default userSignInAction;
