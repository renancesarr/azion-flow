import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { AzionHttpClient } from "../../src/core/http/http-client";

const mockResponse = (status: number, data: any, headers: Record<string, string> = {}) => ({
  status,
  statusText: status === 200 ? "OK" : "ERR",
  ok: status >= 200 && status < 300,
  headers: {
    get: (key: string) => headers[key.toLowerCase()] ?? headers[key],
    entries: () => Object.entries(headers)
  },
  json: vi.fn(async () => data),
  text: vi.fn(async () => JSON.stringify(data))
});

describe("AzionHttpClient (real behavior)", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    globalThis.fetch = originalFetch;
  });

  it("GET envia token e parseia JSON", async () => {
    const response = mockResponse(200, { ok: true }, { "content-type": "application/json" });
    const fetchMock = vi.fn(async () => response as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "abc" });
    const res = await client.get("/test");

    expect(fetchMock).toHaveBeenCalled();
    const headers = fetchMock.mock.calls[0][1]?.headers;
    expect(headers.Authorization).toBe("Token abc");
    expect(headers.Accept).toBe("application/json");
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ok: true });
  });

  it("POST envia body e retorna headers de rate limit", async () => {
    const response = mockResponse(
      200,
      { result: { ok: true } },
      {
        "content-type": "application/json",
        "x-ratelimit-limit": "200",
        "x-ratelimit-remaining": "199"
      }
    );
    const fetchMock = vi.fn(async () => response as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "token-value" });
    const res = await client.post("/items", { name: "item" });

    const headers = fetchMock.mock.calls[0][1]?.headers;
    expect(headers.Authorization).toBe("Token token-value");
    expect(res.headers["x-ratelimit-limit"]).toBe("200");
    expect(res.headers["x-ratelimit-remaining"]).toBe("199");
    expect(res.data).toEqual({ result: { ok: true } });
  });

  it("PATCH/DELETE respeitam códigos de erro com body", async () => {
    const errorBody = { detail: "bad stuff" };
    const response = mockResponse(400, errorBody, { "content-type": "application/json" });
    const fetchMock = vi.fn(async () => response as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "abc" });
    await expect(client.patch("/fail", { name: "x" })).rejects.toThrow("400");
  });

  it("timeout aborta requisição", async () => {
    vi.useFakeTimers();
    const delayedResponse = mockResponse(200, { ok: true }, { "content-type": "application/json" });
    const fetchMock = vi.fn(
      (_url, init) =>
        new Promise((resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(Object.assign(new Error("AbortError"), { name: "AbortError" })));
          setTimeout(() => resolve(delayedResponse as any), 50);
        })
    );
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "abc", timeoutMs: 10 });
    const promise = client.get("/slow");
    vi.advanceTimersByTime(100);
    await expect(promise).rejects.toThrow("Timeout");
    expect(fetchMock).toHaveBeenCalled();
  });
});
