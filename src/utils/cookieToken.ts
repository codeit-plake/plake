"use server";

import { cookies } from "next/headers";

export const setCookieOfToken = async (token: string): Promise<void> => {
  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1시간.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const getCookieOfToken = async (): Promise<string | undefined> => {
  return cookies().get("authToken")?.value;
};

export const clearCookieOfToken = (): void => {
  cookies().delete("authToken");
};
