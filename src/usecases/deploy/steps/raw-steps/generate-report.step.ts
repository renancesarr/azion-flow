import { DeployStepBase } from "../step.base";

export class GenerateReportStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void services;
    void providers;
  }

  async execute(context: any): Promise<void> {
    context.report = context.report ?? {};
    context.report.generatedAt = new Date().toISOString();
  }
}
