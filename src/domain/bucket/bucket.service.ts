type BucketRecord = { id?: string; name: string };

export class BucketService {
  constructor(private readonly provider: any) {}

  sanitizeName(name: string): string {
    const base = (name ?? "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "-");
    if (!base) {
      throw new Error("bucket name cannot be empty");
    }
    return base;
  }

  async listBuckets(): Promise<BucketRecord[]> {
    const list = (await this.provider?.listBuckets?.()) ?? [];
    return list.map((b: any) => ({ id: b?.id ?? b?.name, name: b?.name ?? String(b?.id ?? "") })).filter((b: BucketRecord) => b.name);
  }

  async ensureBucket(name: string): Promise<BucketRecord> {
    const sanitized = this.sanitizeName(name);
    const buckets = await this.listBuckets();
    const existing = buckets.find((b) => b.name === sanitized);
    if (existing) return existing;
    const created = (await this.provider?.ensureBucket?.(sanitized)) ?? { name: sanitized };
    return { id: created?.id ?? created?.name ?? sanitized, name: created?.name ?? sanitized };
  }
}
