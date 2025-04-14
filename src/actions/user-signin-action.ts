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
      console.error("API 응답 오류:", errorText);
      throw new Error(errorText);
    }

    // 토큰을 받아오면 쿠키에 저장
    const res = await response.json();

    // 유저 정보 확인
    const chkResult = await userCheckAction(res.token);

    // 유저 정보 확인 성공
    if (!chkResult.status) {
      throw new Error(chkResult.error);
    }

    // 성공시 유저 정보 반환
    return {
      status: true,
      error: "",
      user: chkResult.user,
    };
  } catch (err) {
    return {
      status: false,
      error: `${(err as Error).message}`,
      user: null,
    };
  }
};

export default userSignInAction;
