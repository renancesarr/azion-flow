import { AZION_API_BASE } from "./endpoints";
import { AzionHttpError } from "./http-error";
import type { HttpRequest, HttpResponse } from "./types";

export class AzionHttpClient {
  token?: string;
  baseUrl: string = AZION_API_BASE;

  async request(req: HttpRequest): Promise<HttpResponse> {
    const url = new URL(req.path ?? "/", req.baseUrl ?? this.baseUrl).toString();
    const headers = {
      ...(req.headers ?? {}),
      ...(this.token ? { Authorization: `Token ${this.token}` } : {})
    };

    const response: any = await (globalThis as any).fetch(url, {
      method: req.method ?? "GET",
      headers,
      body: req.body ? JSON.stringify(req.body) : undefined
    });

    const data = await this.parseBody(response);

    if (!response.ok) {
      throw new AzionHttpError(`${response.status}: ${response.statusText}`);
    }

    return {
      status: response.status,
      data,
      headers: Object.fromEntries(response.headers.entries())
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
