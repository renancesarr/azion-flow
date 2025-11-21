type DomainConfigRecord = { id?: string; domain?: string };

export class DomainConfigService {
  constructor(private readonly provider: any) {}

  async getConfig(domainId: string): Promise<DomainConfigRecord | null> {
    if (!domainId) return null;
    const config = await this.provider?.getConfig?.(domainId);
    if (!config) return null;
    return { id: config.id ?? domainId, domain: config.domain ?? config.name ?? domainId };
  }

  async ensureDomain(domainName: string): Promise<DomainConfigRecord | null> {
    if (!domainName) return null;
    const existing = await this.provider?.getConfig?.(domainName);
    if (existing) {
      return { id: existing.id ?? domainName, domain: existing.domain ?? domainName };
    }
    const created = await this.provider?.ensureDomain?.(domainName);
    return created ? { id: created.id ?? domainName, domain: created.domain ?? domainName } : { id: domainName, domain: domainName };
  }
}
