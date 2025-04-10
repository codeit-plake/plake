import { getCookieOfToken } from "@/utils/cookieToken";

import { checkAuthToken } from "../useCheckToken";

jest.mock("@/utils/cookieToken", () => ({
  getCookieOfToken: jest.fn(),
}));

describe("checkAuthToken 함수 테스트", () => {
  it("토큰이 있으면 true를 반환하고 콜백을 실행하지 않는다", async () => {
    (getCookieOfToken as jest.Mock).mockResolvedValue("valid-token");

    const mockCallback = jest.fn();
    const result = await checkAuthToken(mockCallback);

    expect(result).toBe(true);
    expect(getCookieOfToken).toHaveBeenCalledTimes(1);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("토큰이 없으면 false를 반환하고 콜백을 실행한다", async () => {
    (getCookieOfToken as jest.Mock).mockResolvedValue(null);

    const mockCallback = jest.fn();
    const result = await checkAuthToken(mockCallback);

    expect(result).toBe(false);
    expect(getCookieOfToken).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("쿠키 조회 중 에러가 발생하면 에러를 throw한다", async () => {
    const mockError = new Error("쿠키 접근 실패");
    (getCookieOfToken as jest.Mock).mockRejectedValue(mockError);

    const mockCallback = jest.fn();
    await expect(checkAuthToken(mockCallback)).rejects.toThrow(
      "토큰 확인 중 오류가 발생했습니다. Error: 쿠키 접근 실패",
    );

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
