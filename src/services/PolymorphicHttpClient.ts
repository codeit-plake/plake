import BaseHttpClient from "@/services/BaseHttpClient";

class PolymorphicHttpClient extends BaseHttpClient {
  private static instance: PolymorphicHttpClient;
  protected baseURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

  protected async attachCookies(headers: Headers) {
    if (typeof window !== "undefined") return;

    const { cookies } = await import("next/headers");
    const _cookies = cookies().getAll();
    const cookieStr = _cookies.map(c => `${c.name}=${c.value}`).join("; ");
    headers.set("Cookie", cookieStr);
  }

  public static getInstance(): PolymorphicHttpClient {
    if (!PolymorphicHttpClient.instance) {
      PolymorphicHttpClient.instance = new PolymorphicHttpClient();
    }
    return PolymorphicHttpClient.instance;
  }
}

export default PolymorphicHttpClient;
