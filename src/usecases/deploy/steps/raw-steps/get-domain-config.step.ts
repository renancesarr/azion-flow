import { DeployStepBase } from "../step.base";

export class GetDomainConfigStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    if (!context.domain) {
      return;
    }
    const domainService = this.services?.domainConfigService;
    const config = domainService ? await domainService.getConfig(context.domain) : null;
    if (config) {
      context.report = context.report ?? {};
      context.report.domainConfig = config;
    }
  }
}
