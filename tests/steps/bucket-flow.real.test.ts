import { describe, it, expect } from "vitest";
import { ListBucketsStep } from "../../src/usecases/deploy/steps/raw-steps/list-buckets.step";
import { EnsureBucketStep } from "../../src/usecases/deploy/steps/raw-steps/ensure-bucket.step";
import { SyncFilesStep } from "../../src/usecases/deploy/steps/raw-steps/sync-files.step";

class MockBucketService {
  private buckets = [{ id: "1", name: "existing" }];
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

class MockFileSyncService {
  async sync(_buildDir: string, _bucket: string) {
    return { uploaded: 2 };
  }
}

describe("Bucket steps real", () => {
  it("should list, ensure and sync", async () => {
    const services = {
      bucketService: new MockBucketService(),
      fileSyncService: new MockFileSyncService()
    };
    const context: any = { report: {}, buildDir: "/tmp/build" };

    await new ListBucketsStep(services).execute(context);
    expect(context.report.buckets?.length).toBeGreaterThan(0);

    await new EnsureBucketStep(services).execute(context);
    expect(context.bucketName).toBeDefined();

    await new SyncFilesStep(services).execute(context);
    expect(context.report.sync?.uploaded).toBe(2);
  });
});
