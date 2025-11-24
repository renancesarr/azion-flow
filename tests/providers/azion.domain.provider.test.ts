import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionDomainProvider } from "../../src/providers/azion/azion.domain";
import { AzionHttpClient } from "../../src/providers/azion/http/http-client";

describe("AzionDomainProvider", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("should get domain config", async () => {
    const response = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ result: { id: "dom-1", domain: "example.com" } }))
    } as any;
    const fetchMock = vi.fn(async () => response);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionDomainProvider({ token: "test-token", http });
    const config = await provider.getDomainConfig("dom-1");
    expect(config?.domain).toBe("example.com");
  });

  it("should ensure domain via POST", async () => {
    const response = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ result: { id: "dom-2", domain: "new.com" } }))
    } as any;
    const fetchMock = vi.fn(async () => response);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionDomainProvider({ token: "test-token", http });
    const ensured = await provider.ensureDomain("new.com");
    expect(ensured?.domain).toBe("new.com");
    expect(ensured?.id).toBe("dom-2");
  });
});
