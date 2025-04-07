import BaseHttpClient from "@/services/BaseHttpClient";

class HttpClient extends BaseHttpClient {
  private static instance: HttpClient;
  protected baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

  protected async attachCookies() {
    return;
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }
}

export default HttpClient;
