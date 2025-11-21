import type { AzionDomainDto } from "./domain/domain.dto";
import { AzionHttpClient } from "./http/http-client";

export class AzionDomainProvider {
  constructor(private readonly http = new AzionHttpClient()) {}

  async getDomainConfig(domainId: string): Promise<AzionDomainDto | null> {
    if (!domainId) return null;
    const res = await this.http.request({ path: `/domains/${domainId}` });
    const data = (res.data as any)?.result ?? res.data ?? null;
    if (!data) return null;
    return { id: data.id ?? domainId, domain: data.domain ?? data.name ?? domainId };
  }

  async ensureDomain(domainName: string): Promise<AzionDomainDto | null> {
    if (!domainName) return null;
    const res = await this.http.request({ path: "/domains", method: "POST", body: { domain: domainName } });
    const data = (res.data as any)?.result ?? res.data ?? null;
    return data ? { id: data.id ?? domainName, domain: data.domain ?? domainName } : { id: domainName, domain: domainName };
  }
}
