"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const userSignUpAction = async (_: any, formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const companyName = formData.get("companyName")?.toString();
  const password = formData.get("password")?.toString();

  const userData = { email, name, companyName, password };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auths/signup`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // 회원가입 실패
  if (!response.ok) {
    // throw new Error(await response.text());
    return {
      status: false,
      error: await response.text(),
    };
  }

  // 회원가입 성공
  return {
    status: true,
    error: "",
  };
};

export default userSignUpAction;
