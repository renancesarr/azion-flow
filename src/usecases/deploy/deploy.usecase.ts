import { DeployOrchestrator } from "./deploy.orchestrator";

interface DeployResult {
  success: boolean;
  report: Record<string, unknown>;
}

export class DeployUseCase {
  constructor(private readonly orchestrator: DeployOrchestrator) {}

  async execute(initialContext: any = {}): Promise<DeployResult> {
    const { context, success } = await this.orchestrator.run(initialContext);
    return {
      success,
      report: context.report ?? {}
    };
  }
}
