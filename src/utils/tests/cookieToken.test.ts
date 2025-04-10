import { cookies } from "next/headers";

import {
  clearCookieOfToken,
  getCookieOfToken,
  setCookieOfToken,
} from "../cookieToken";

const mockCookies = cookies as jest.MockedFunction<typeof cookies>;

describe("cookieToken 유틸리티 테스트", () => {
  describe("setCookieOfToken", () => {
    it("올바른 옵션으로 authToken 쿠키를 설정한다", async () => {
      const token = "test-token-123";
      await setCookieOfToken(token);

      expect(mockCookies().set).toHaveBeenCalledTimes(1);
      expect(mockCookies().set).toHaveBeenCalledWith({
        name: "authToken",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 3600,
        secure: false,
        sameSite: "lax",
      });
    });
  });

  describe("getCookieOfToken", () => {
    it("authToken 쿠키가 없으면 undefined를 반환한다", async () => {
      (mockCookies().get as jest.Mock).mockReturnValueOnce(undefined);

      const token = await getCookieOfToken();
      expect(token).toBeUndefined();
      expect(mockCookies().get).toHaveBeenCalledWith("authToken");
    });

    it("authToken 쿠키가 있으면 그 값을 반환한다", async () => {
      const testToken = "test-token-123";

      (mockCookies().get as jest.Mock).mockReturnValueOnce({
        name: "authToken",
        value: testToken,
      });

      const token = await getCookieOfToken();
      expect(token).toBe(testToken);
      expect(mockCookies().get).toHaveBeenCalledWith("authToken");
    });
  });

  describe("clearCookieOfToken", () => {
    it("authToken 쿠키를 삭제한다", () => {
      clearCookieOfToken();
      expect(mockCookies().delete).toHaveBeenCalledTimes(1);
      expect(mockCookies().delete).toHaveBeenCalledWith("authToken");
    });
  });
});
