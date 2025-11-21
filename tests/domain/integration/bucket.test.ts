import { describe, it, expect } from "vitest";
import { BucketService } from "../../../src/domain/bucket/bucket.service";

class MockStorageProvider {
  buckets = [{ id: "1", name: "existing" }];
  async listBuckets() {
    return this.buckets;
  }
  async ensureBucket(name: string) {
    const found = this.buckets.find((b) => b.name === name);
    if (found) return found;
    const created = { id: String(this.buckets.length + 1), name };
    this.buckets.push(created);
    return created;
  }
}

describe("BucketService real integration (mocked provider)", () => {
  it("sanitizes and ensures bucket", async () => {
    const provider = new MockStorageProvider();
    const service = new BucketService(provider);

    const sanitized = service.sanitizeName(" My Bucket ");
    expect(sanitized).toBe("my-bucket");

    const listed = await service.listBuckets();
    expect(listed.length).toBe(1);

    const created = await service.ensureBucket("New One");
    expect(created.name).toBe("new-one");
    expect(provider.buckets.length).toBe(2);
  });
});
