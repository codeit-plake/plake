export interface HTTPInstance {
  get<R>(url: string, config?: RequestInit): Promise<R>;
  post<T, R = T>(url: string, data?: T, config?: RequestInit): Promise<R>;
  put<T, R = T>(url: string, data?: T, config?: RequestInit): Promise<R>;
  delete<R>(url: string, config?: RequestInit): Promise<R>;
}

abstract class BaseHttpClient implements HTTPInstance {
  protected abstract baseURL: string;
  protected abstract attachCookies(headers: Headers): Promise<void>;

  protected async request<R = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<R> {
    const isFormData = data instanceof FormData;
    const headers = new Headers(config?.headers);

    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }

    await this.attachCookies(headers);

    const response = await fetch(this.baseURL + url, {
      method,
      headers,
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      ...config,
    });

    const responseData: R = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return responseData;
  }

  public get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  public post<T, R = T>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R> {
    return this.request<R>("POST", url, data, config);
  }

  public put<T, R = T>(
    url: string,
    data?: T,
    config?: RequestInit,
  ): Promise<R> {
    return this.request<R>("PUT", url, data, config);
  }

  public delete<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>("DELETE", url, undefined, config);
  }
}

export default BaseHttpClient;
