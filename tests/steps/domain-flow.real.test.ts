import { describe, it, expect } from "vitest";
import { GetDomainConfigStep } from "../../src/usecases/deploy/steps/raw-steps/get-domain-config.step";
import { EnsureDomainStep } from "../../src/usecases/deploy/steps/raw-steps/ensure-domain.step";

class MockDomainService {
  async getConfig(domain: string) {
    return { id: "dom-1", domain };
  }
  async ensureDomain(domain: string) {
    return { id: "dom-1", domain };
  }
}

describe("Domain steps real", () => {
  it("should fetch and ensure domain", async () => {
    const services = { domainConfigService: new MockDomainService() };
    const context: any = { domain: "example.com", report: {} };

    await new GetDomainConfigStep(services).execute(context);
    expect(context.report.domainConfig?.domain).toBe("example.com");

    await new EnsureDomainStep(services).execute(context);
    expect(context.report.domain?.domain).toBe("example.com");
  });
});
