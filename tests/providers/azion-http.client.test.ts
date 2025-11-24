import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionHttpClient } from "../../src/providers/azion/http/http-client";

const mockResponse = (status: number, data: any, headers: Record<string, string> = {}) => ({
  status,
  statusText: status === 200 ? "OK" : "ERR",
  ok: status >= 200 && status < 300,
  headers: {
    get: (key: string) => headers[key.toLowerCase()] ?? headers[key]
  },
  json: vi.fn(async () => data),
  text: vi.fn(async () => JSON.stringify(data))
});

describe("AzionHttpClient", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("should send token in headers and parse json", async () => {
    const response = mockResponse(200, { ok: true }, { "content-type": "application/json" });
    const fetchMock = vi.fn(async () => response as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "abc" });
    const res = await client.request({ path: "/test" });

    expect(fetchMock).toHaveBeenCalled();
    const headers = fetchMock.mock.calls[0][1]?.headers;
    expect(headers.Authorization).toBe("Token abc");
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ok: true });
  });

  it("should throw AzionHttpError on non-2xx", async () => {
    const response = mockResponse(500, { ok: false }, { "content-type": "application/json" });
    const fetchMock = vi.fn(async () => response as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const client = new AzionHttpClient({ token: "abc" });
    await expect(client.request({ path: "/fail" })).rejects.toThrow("500");
  });
});
