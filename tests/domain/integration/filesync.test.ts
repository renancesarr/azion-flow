import { describe, it, expect } from "vitest";
import { FileSyncService } from "../../../src/domain/filesync/file-sync.service";

class MockFsProvider {
  async listLocalFiles(_dir: string) {
    return ["a.txt", ".hidden", "b.txt"];
  }
}

class MockHttpProvider {
  uploaded: string[] = [];
  async listRemoteFiles(_bucket: string) {
    return ["a.txt"];
  }
  async uploadFile(_bucket: string, file: string) {
    this.uploaded.push(file);
  }
}

describe("FileSyncService integration (diff + upload)", () => {
  it("should skip existing remote files and upload diff", async () => {
    const http = new MockHttpProvider();
    const service = new FileSyncService(new MockFsProvider(), http);
    const stats = await service.sync("/tmp", "demo");
    expect(stats.uploaded).toBe(1); // b.txt
    expect(stats.skipped).toBe(1); // a.txt
    expect(http.uploaded).toEqual(["b.txt"]);
  });
});
