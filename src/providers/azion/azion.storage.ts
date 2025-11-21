import type { AzionBucketDto } from "./storage/bucket.dto";

export class AzionStorageProvider {
  async listBuckets(): Promise<AzionBucketDto[]> {
    return [];
  }

  async ensureBucket(name: string): Promise<AzionBucketDto> {
    return { name };
  }
}
