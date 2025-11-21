type SyncStats = { uploaded: number; skipped: number };

export class FileSyncService {
  constructor(private readonly provider: any, private readonly http: any) {}

  async listLocalFiles(buildDir: string): Promise<string[]> {
    const list = (await this.provider?.listLocalFiles?.(buildDir)) ?? [];
    if (!Array.isArray(list)) return [];
    return list
      .filter((p) => typeof p === "string" && p.trim() && !p.split("/").some((segment) => segment.startsWith(".")))
      .map((p) => p.trim());
  }

  async listRemoteFiles(bucketName: string): Promise<string[]> {
    if (!this.http?.listRemoteFiles) return [];
    const list = (await this.http.listRemoteFiles(bucketName)) ?? [];
    return Array.isArray(list) ? list : [];
  }

  async sync(buildDir: string, bucketName: string): Promise<SyncStats> {
    const localFiles = await this.listLocalFiles(buildDir);
    const remoteFiles = await this.listRemoteFiles(bucketName);

    const remoteSet = new Set(remoteFiles);
    let uploaded = 0;
    let skipped = 0;

    for (const file of localFiles) {
      if (remoteSet.has(file)) {
        skipped += 1;
        continue;
      }
      if (this.http?.uploadFile) {
        await this.http.uploadFile(bucketName, file);
      }
      uploaded += 1;
    }

    return { uploaded, skipped };
  }
}
