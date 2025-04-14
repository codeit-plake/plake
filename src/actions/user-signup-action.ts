"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const userSignUpAction = async (_: any, formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const companyName = formData.get("companyName")?.toString();
  const password = formData.get("password")?.toString();

  const userData = { email, name, companyName, password };

  try {
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

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `${(err as Error).message}`,
    };
  }
};

export default userSignUpAction;
