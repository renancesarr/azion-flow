import type { AzionBucketDto } from "./storage/bucket.dto";
import { AzionHttpClient } from "./http/http-client";

export class AzionStorageProvider {
  constructor(private readonly http = new AzionHttpClient()) {}

  async listBuckets(): Promise<AzionBucketDto[]> {
    const res = await this.http.request({ path: "/storage/buckets" });
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }

  async ensureBucket(name: string): Promise<AzionBucketDto> {
    const res = await this.http.request({ path: "/storage/buckets", method: "POST", body: { name } });
    const data = (res.data as any)?.result ?? res.data ?? {};
    return { id: data.id, name: data.name ?? name };
  }
}
