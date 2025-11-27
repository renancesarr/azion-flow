import { describe, it, expect } from "vitest";
import { DomainConfigService } from "../../../src/domains/domain-config/domain-config.service";

class MockDomainProvider {
  async getConfig(domainId: string) {
    return { id: domainId, domain: domainId };
  }
  async ensureDomain(domainName: string) {
    return { id: "new", domain: domainName };
  }
}

describe("DomainConfigService integration", () => {
  it("should return existing config", async () => {
    const service = new DomainConfigService(new MockDomainProvider());
    const config = await service.getConfig("example.com");
    expect(config?.domain).toBe("example.com");
  });

  it("should ensure new domain when not present", async () => {
    const service = new DomainConfigService(new MockDomainProvider());
    const ensured = await service.ensureDomain("new.com");
    expect(ensured?.domain).toBe("new.com");
  });
});
