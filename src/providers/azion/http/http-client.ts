import { AZION_API_BASE } from "./endpoints";
import { AzionHttpError } from "./http-error";
import type { HttpClientConfig } from "./http-config";
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
  body?: string | Uint8Array | undefined;
  signal?: AbortSignal;
};

type FetchImpl = (input: string | URL, init?: MinimalRequestInit) => Promise<MinimalResponse>;
type FetchResponse = MinimalResponse;
type Logger = (message: string, meta?: unknown) => void;

export class AzionHttpClient {
  private token: string;
  private baseUrl: string;
  private readonly timeoutMs: number;
  private readonly debugEnabled: boolean;
  private readonly fetchImpl: FetchImpl;
  private readonly logger?: Logger;

  constructor(options: HttpClientConfig & { fetchImpl?: FetchImpl; logger?: Logger }) {
    const token = options.token?.trim();
    if (!token) {
      throw new Error("AZION_TOKEN ausente: forneça um token ao criar o AzionHttpClient.");
    }

    this.token = token; // token deve ser fornecido explicitamente (CLI/config)
    this.baseUrl = options.baseUrl ?? AZION_API_BASE;
    this.timeoutMs = options.timeoutMs ?? 15000;
    this.fetchImpl = options.fetchImpl ?? (globalThis.fetch as FetchImpl);
    this.logger = options.logger;
    this.debugEnabled = process.env.AZION_FLOW_DEBUG === "1";
  }

  setToken(token: string) {
    const nextToken = token?.trim();
    if (!nextToken) {
      throw new Error("AZION_TOKEN ausente: informe um token válido.");
    }
    this.token = nextToken;
  }

  async get(path: string, headers?: Record<string, string>) {
    return this.request({ path, method: "GET", headers });
  }

  async post(path: string, body?: unknown, headers?: Record<string, string>) {
    return this.request({ path, method: "POST", body, headers });
  }

  async patch(path: string, body?: unknown, headers?: Record<string, string>) {
    return this.request({ path, method: "PATCH", body, headers });
  }

  async delete(path: string, headers?: Record<string, string>) {
    return this.request({ path, method: "DELETE", headers });
  }

  async request(req: HttpRequest): Promise<HttpResponse> {
    // aborta cedo se não houver token explícito
    if (!this.token && !(req.headers && req.headers.Authorization)) {
      throw new AzionHttpError("AZION_TOKEN ausente: solicite/colete o token antes de chamar a API.");
    }

    const url = new URL(req.path ?? "/", req.baseUrl ?? this.baseUrl).toString();
    const headers = this.buildHeaders(req.headers, this.token);
    const controller = typeof AbortController !== "undefined" ? new AbortController() : undefined;
    const timeout = this.timeoutMs;
    const body =
      req.body === undefined || req.body === null
        ? undefined
        : typeof req.body === "string" || req.body instanceof Uint8Array
          ? req.body
          : JSON.stringify(req.body);

    let timeoutId: NodeJS.Timeout | undefined;
    if (controller && timeout > 0) {
      timeoutId = setTimeout(() => controller.abort(), timeout);
    }

    this.log("request", { url, method: req.method ?? "GET", headers });

    try {
      const response: FetchResponse = await this.fetchImpl(url, {
        method: req.method ?? "GET",
        headers,
        body,
        signal: controller?.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      const data = await this.parseBody(response);
      if (!response.ok) {
        await this.handleHttpError(response, data);
      }

      const result: HttpResponse = {
        status: response.status,
        data,
        headers: this.toRecord(response.headers)
      };

      this.log("response", { url, status: response.status });
      return result;
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      if ((err as Error)?.name === "AbortError") {
        throw new AzionHttpError(`Timeout após ${timeout}ms`);
      }
      throw err;
    }
  }

  private buildHeaders(extra: Record<string, string> | undefined, token?: string): Record<string, string> {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "azion-flow/0.1",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...(extra ?? {})
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

  private async handleHttpError(res: FetchResponse, body: unknown): Promise<never> {
    const base = `${res.status}: ${res.statusText}`;
    const detail = typeof body === "string" ? body : JSON.stringify(body);
    throw new AzionHttpError(`${base}${detail ? ` — ${detail}` : ""}`);
  }

  private log(message: string, meta?: unknown) {
    if (!this.debugEnabled) return;
    const sink = this.logger ?? ((msg: string, data?: unknown) => console.debug(msg, data));
    sink(`[azion-http] ${message}`, meta);
  }
}
