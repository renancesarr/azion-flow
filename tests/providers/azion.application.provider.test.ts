import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionApplicationProvider } from "../../src/providers/azion/azion.application";
import { AzionHttpClient } from "../../src/providers/azion/http/http-client";

describe("AzionApplicationProvider", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("should list applications", async () => {
    const response = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ results: [{ id: "app-1", name: "demo" }] }))
    } as any;
    const fetchMock = vi.fn(async () => response);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionApplicationProvider({ token: "test-token", http });
    const apps = await provider.listApplications();
    expect(apps[0].name).toBe("demo");
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("/applications"), expect.anything());
  });
});
