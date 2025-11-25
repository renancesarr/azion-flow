import type { AzionDomainDto } from "./domain/domain.dto";
import { getDomainConfigUrl } from "./http/endpoints";
import { AzionHttpClient } from "./http/http-client";

export class AzionDomainProvider {
  private readonly http: AzionHttpClient;

  constructor(options: { token: string; http?: AzionHttpClient }) {
    this.http = options.http ?? new AzionHttpClient({ token: options.token });
  }

  async getDomainConfig(domainId: string): Promise<AzionDomainDto | null> {
    if (!domainId) return null;
    const res = await this.http.get(getDomainConfigUrl(domainId));
    const data = (res.data as any)?.result ?? res.data ?? null;
    if (!data) return null;
    return { id: data.id ?? domainId, domain: data.domain ?? data.name ?? domainId };
  }

  async ensureDomain(domainName: string): Promise<AzionDomainDto | null> {
    if (!domainName) return null;
    const res = await this.http.patch(getDomainConfigUrl(domainName), { domain: domainName });
    const data = (res.data as any)?.result ?? res.data ?? null;
    return data
      ? { id: data.id ?? domainName, domain: data.domain ?? domainName }
      : { id: domainName, domain: domainName };
  }
}
