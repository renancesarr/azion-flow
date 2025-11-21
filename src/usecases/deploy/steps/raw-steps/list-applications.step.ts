import { DeployStepBase } from "../step.base";

export class ListApplicationsStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const applicationService = this.services?.applicationService;
    const apps = applicationService ? await applicationService.listApplications() : [];
    context.report = context.report ?? {};
    context.report.applications = apps;
  }
}
