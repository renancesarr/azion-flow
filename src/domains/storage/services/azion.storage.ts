import type { AzionBucketDto } from "../dto/bucket.dto";
import {
  createBucketUrl,
  getBucketsUrl,
  uploadFileUrl
} from "../../../core/http/endpoints";
import { AzionHttpClient } from "../../../core/http/http-client";

export class AzionStorageProvider {
  private readonly http: AzionHttpClient;

  constructor(options: { token: string; http?: AzionHttpClient }) {
    this.http = options.http ?? new AzionHttpClient({ token: options.token });
  }

  async listBuckets(): Promise<AzionBucketDto[]> {
    const res = await this.http.get(getBucketsUrl());
    const results = (res.data as any)?.results ?? res.data ?? [];
    if (!Array.isArray(results)) return [];
    return results.map((bucket: any) => ({ id: bucket.id, name: bucket.name }));
  }

  async ensureBucket(name: string): Promise<AzionBucketDto> {
    const existing = await this.listBuckets();
    const found = existing.find((b) => b.name === name);
    if (found) return found;

    const res = await this.http.post(createBucketUrl(), { name });
    const data = (res.data as any)?.result ?? res.data ?? {};
    return { id: data.id, name: data.name ?? name };
  }

  async upload(bucket: string, path: string, content: Buffer | string | Uint8Array) {
    const res = await this.http.post(uploadFileUrl(bucket, path), content, {
      "Content-Type": "application/octet-stream"
    });
    return res.status >= 200 && res.status < 300;
  }
}
