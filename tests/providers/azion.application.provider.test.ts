import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionApplicationProvider } from "../../src/providers/azion/azion.application";

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

    const provider = new AzionApplicationProvider();
    const apps = await provider.listApplications();
    expect(apps[0].name).toBe("demo");
  });
});
