import type { AzionDomainDto } from "./domain/domain.dto";

export class AzionDomainProvider {
  async getDomainConfig(domainId: string): Promise<AzionDomainDto | null> {
    if (!domainId) return null;
    return { id: domainId, domain: domainId };
  }
}
