import { DeployStepBase } from "../step.base";

export class EnsureDomainStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    if (!context.domain) return;
    const domainService = this.services?.domainConfigService;
    const ensured = domainService ? await domainService.ensureDomain(context.domain) : { domain: context.domain };
    context.report = context.report ?? {};
    context.report.domain = ensured;
  }
}
