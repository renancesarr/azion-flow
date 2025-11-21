import { DeployStepBase } from "../step.base";

export class SelectApplicationStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const applicationService = this.services?.applicationService;
    const currentId = context.applicationId;
    if (currentId) return;
    const selected = applicationService ? await applicationService.selectApplication({}) : null;
    if (selected) {
      context.applicationId = selected.id;
      context.report = context.report ?? {};
      context.report.selectedApplication = selected;
    }
  }
}
