import { AZION_API_BASE } from "./endpoints";
import { AzionHttpError } from "./http-error";
import type { HttpRequest, HttpResponse } from "./types";

// Tipagens mínimas para evitar dependência dos tipos DOM em Node
type MinimalHeaders = {
  get: (key: string) => string | null | undefined;
  entries?: () => Iterable<[string, string]>;
};

type MinimalResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: MinimalHeaders;
  json: () => Promise<any>;
  text: () => Promise<string>;
};

type MinimalRequestInit = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

type FetchImpl = (input: string | URL, init?: MinimalRequestInit) => Promise<MinimalResponse>;
type FetchResponse = MinimalResponse;

export class AzionHttpClient {
  token?: string;
  baseUrl: string = AZION_API_BASE;
  private readonly fetchImpl: FetchImpl;

  constructor(options: { token?: string; baseUrl?: string; fetchImpl?: FetchImpl } = {}) {
    this.token = options.token; // token deve ser fornecido pela CLI/config, não por env implícita
    this.baseUrl = options.baseUrl ?? AZION_API_BASE;
    this.fetchImpl = options.fetchImpl ?? (globalThis.fetch as FetchImpl);
  }

  async request(req: HttpRequest): Promise<HttpResponse> {
    if (!this.token && !(req.headers && req.headers.Authorization)) {
      throw new AzionHttpError("AZION_TOKEN não definido: forneça token via CLI/config");
    }
    const url = new URL(req.path ?? "/", req.baseUrl ?? this.baseUrl).toString();
    const headers = {
      "content-type": "application/json",
      ...(req.headers ?? {}),
      ...(this.token ? { Authorization: `Token ${this.token}` } : {})
    };

    const response: FetchResponse = await this.fetchImpl(url, {
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

  private async parseBody(res: FetchResponse): Promise<unknown> {
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
