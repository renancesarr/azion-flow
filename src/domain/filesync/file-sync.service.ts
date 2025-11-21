type SyncStats = { uploaded: number };

export class FileSyncService {
  constructor(private readonly provider: any, private readonly http: any) {}

  async listLocalFiles(buildDir: string): Promise<string[]> {
    const list = (await this.provider?.listLocalFiles?.(buildDir)) ?? [];
    return Array.isArray(list) ? list : [];
  }

  async sync(buildDir: string, bucketName: string): Promise<SyncStats> {
    const files = await this.listLocalFiles(buildDir);
    let uploaded = 0;
    for (const file of files) {
      if (this.http?.uploadFile) {
        await this.http.uploadFile(bucketName, file);
      }
      uploaded += 1;
    }
    return { uploaded };
  }
}
