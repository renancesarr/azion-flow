import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionStorageProvider } from "../../src/providers/azion/azion.storage";
import { AzionHttpClient } from "../../src/providers/azion/http/http-client";

describe("AzionStorageProvider", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
  });

  it("should list buckets via http client", async () => {
    const response = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ results: [{ id: "1", name: "bucket" }] }))
    } as any;
    const fetchMock = vi.fn(async () => response);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const provider = new AzionStorageProvider(new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any }));
    const buckets = await provider.listBuckets();
    expect(fetchMock).toHaveBeenCalled();
    expect(buckets[0].name).toBe("bucket");
  });

  it("should ensure bucket via POST", async () => {
    const response = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ result: { id: "2", name: "new" } }))
    } as any;
    const fetchMock = vi.fn(async () => response);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const provider = new AzionStorageProvider(new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any }));
    const bucket = await provider.ensureBucket("new");
    expect(bucket.name).toBe("new");
    expect(bucket.id).toBe("2");
  });
});
