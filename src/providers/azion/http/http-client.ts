import { AZION_API_BASE } from "./endpoints";
import { AzionHttpError } from "./http-error";
import type { HttpRequest, HttpResponse } from "./types";

type FetchImpl = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export class AzionHttpClient {
  token?: string;
  baseUrl: string = AZION_API_BASE;
  private readonly fetchImpl: FetchImpl;

  constructor(options: { token?: string; baseUrl?: string; fetchImpl?: FetchImpl } = {}) {
    this.token = options.token ?? process.env.AZION_TOKEN;
    this.baseUrl = options.baseUrl ?? AZION_API_BASE;
    this.fetchImpl = options.fetchImpl ?? (globalThis.fetch as FetchImpl);
  }

  async request(req: HttpRequest): Promise<HttpResponse> {
    const url = new URL(req.path ?? "/", req.baseUrl ?? this.baseUrl).toString();
    const headers = {
      "content-type": "application/json",
      ...(req.headers ?? {}),
      ...(this.token ? { Authorization: `Token ${this.token}` } : {})
    };

    const response: any = await this.fetchImpl(url, {
      method: req.method ?? "GET",
      headers,
      body: req.body ? JSON.stringify(req.body) : undefined
    });

    const data = await this.parseBody(response);

    if (!response.ok) {
      throw new AzionHttpError(`${response.status}: ${response.statusText}`);
    }

    const headerEntries = response.headers?.entries ? Object.fromEntries(response.headers.entries()) : {};

    return {
      status: response.status,
      data,
      headers: headerEntries
    };
  }

  private async parseBody(res: any): Promise<unknown> {
    const contentType = res.headers?.get?.("content-type") ?? "";
    if (contentType.includes("application/json") && typeof res.json === "function") {
      return res.json();
    }
    if (typeof res.text === "function") {
      return res.text();
    }
    return null;
  }
}
