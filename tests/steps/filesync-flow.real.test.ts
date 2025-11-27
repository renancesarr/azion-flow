import { describe, it, expect } from "vitest";
import { SyncFilesStep } from "../../src/usecases/deploy/steps/raw-steps/sync-files.step";
import { FileSyncService } from "../../src/domains/filesync/file-sync.service";

class MockFsProvider {
  async listLocalFiles(_dir: string) {
    return ["a.txt", ".hidden", "b.txt"];
  }
}

class MockHttpProvider {
  async listRemoteFiles(_bucket: string) {
    return ["a.txt"]; // already exists remotely
  }
  async uploadFile(_bucket: string, _file: string) {
    return true;
  }
}

describe("FileSyncService diff minimal", () => {
  it("should skip existing remote files and upload the rest", async () => {
    const service = new FileSyncService(new MockFsProvider(), new MockHttpProvider());
    const step = new SyncFilesStep({ fileSyncService: service });
    const context: any = { buildDir: "/tmp/build", bucketName: "demo", report: {} };
    await step.execute(context);
    expect(context.report.sync.uploaded).toBe(1); // only b.txt
    expect(context.report.sync.skipped).toBe(1); // a.txt skipped
  });
});
