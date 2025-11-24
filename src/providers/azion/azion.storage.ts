import type { AzionBucketDto } from "./storage/bucket.dto";
import { AzionHttpClient } from "./http/http-client";

const PATH_BUCKETS = "/workspace/storage/buckets";

export class AzionStorageProvider {
  private readonly http: AzionHttpClient;

  constructor(options: { token: string; http?: AzionHttpClient }) {
    this.http = options.http ?? new AzionHttpClient({ token: options.token });
  }

  async listBuckets(): Promise<AzionBucketDto[]> {
    const res = await this.http.request({ path: PATH_BUCKETS });
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }

  async ensureBucket(name: string): Promise<AzionBucketDto> {
    const res = await this.http.request({ path: PATH_BUCKETS, method: "POST", body: { name } });
    const data = (res.data as any)?.result ?? res.data ?? {};
    return { id: data.id, name: data.name ?? name };
  }
}
