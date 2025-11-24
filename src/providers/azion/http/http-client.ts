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
  body?: string | undefined;
};

type FetchImpl = (input: string | URL, init?: MinimalRequestInit) => Promise<MinimalResponse>;
type FetchResponse = MinimalResponse;

export class AzionHttpClient {
  private token: string;
  private baseUrl: string = AZION_API_BASE;
  private readonly fetchImpl: FetchImpl;

  constructor(options: { token: string; baseUrl?: string; fetchImpl?: FetchImpl }) {
    const token = options.token?.trim();
    if (!token) {
      throw new Error("AZION_TOKEN ausente: forneça um token ao criar o AzionHttpClient.");
    }

    this.token = token; // token deve ser fornecido explicitamente (CLI/config)
    this.baseUrl = options.baseUrl ?? AZION_API_BASE;
    this.fetchImpl = options.fetchImpl ?? (globalThis.fetch as FetchImpl);
  }

  setToken(token: string) {
    const nextToken = token?.trim();
    if (!nextToken) {
      throw new Error("AZION_TOKEN ausente: informe um token válido.");
    }
    this.token = nextToken;
  }

  async request(req: HttpRequest): Promise<HttpResponse> {
    // aborta cedo se não houver token explícito
    if (!this.token && !(req.headers && req.headers.Authorization)) {
      throw new AzionHttpError("AZION_TOKEN ausente: solicite/colete o token antes de chamar a API.");
    }

    const url = new URL(req.path ?? "/", req.baseUrl ?? this.baseUrl).toString();
    const headers = this.buildHeaders(req.headers, this.token);

    const response: FetchResponse = await this.fetchImpl(url, {
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
      headers: this.toRecord(response.headers)
    };
  }

  private buildHeaders(extra: Record<string, string> | undefined, token?: string): Record<string, string> {
    return {
      "content-type": "application/json",
      ...(extra ?? {}),
      ...(token ? { Authorization: `Token ${token}` } : {})
    };
  }

  private toRecord(headers: MinimalHeaders): Record<string, string> {
    if (headers.entries) return Object.fromEntries(headers.entries());
    return {};
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
