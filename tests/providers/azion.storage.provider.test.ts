import { describe, it, expect, vi, afterEach } from "vitest";
import { AzionStorageProvider } from "../../src/domains/storage/services/azion.storage";
import { AzionHttpClient } from "../../src/core/http/http-client";

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

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionStorageProvider({ token: "test-token", http });
    const buckets = await provider.listBuckets();
    expect(fetchMock).toHaveBeenCalled();
    expect(buckets[0].name).toBe("bucket");
  });

  it("should ensure bucket via POST", async () => {
    const listResponse = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ results: [] }))
    } as any;
    const createResponse = {
      status: 200,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({ result: { id: "2", name: "new" } }))
    } as any;
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(listResponse as any).mockResolvedValueOnce(createResponse as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionStorageProvider({ token: "test-token", http });
    const bucket = await provider.ensureBucket("new");
    expect(bucket.name).toBe("new");
    expect(bucket.id).toBe("2");
  });

  it("should upload file with octet-stream header", async () => {
    const uploadResponse = {
      status: 201,
      ok: true,
      headers: { get: () => "application/json" },
      json: vi.fn(async () => ({}))
    } as any;
    const fetchMock = vi.fn().mockResolvedValue(uploadResponse as any);
    // @ts-ignore
    globalThis.fetch = fetchMock;

    const http = new AzionHttpClient({ token: "test-token", fetchImpl: fetchMock as any });
    const provider = new AzionStorageProvider({ token: "test-token", http });
    const ok = await provider.upload("bucket", "file.txt", Buffer.from("hi"));

    expect(ok).toBe(true);
    const init = fetchMock.mock.calls[0][1];
    expect(init?.headers?.["Content-Type"]).toBe("application/octet-stream");
  });
});
