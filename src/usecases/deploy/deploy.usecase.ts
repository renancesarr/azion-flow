import { DeployOrchestrator } from "./deploy.orchestrator";
import { logDeployError, logDeployFinished, logDeployStart } from "../../telemetry/events/deploy";
import { sendEvents } from "../../telemetry/send";

interface DeployResult {
  success: boolean;
  report: Record<string, unknown>;
}

export class DeployUseCase {
  constructor(private readonly orchestrator: DeployOrchestrator) {}

  async execute(initialContext: any = {}): Promise<DeployResult> {
    await logDeployStart();

    try {
      const { context, success } = await this.orchestrator.run(initialContext);
      const report = context.report ?? {};

      if (success) {
        await logDeployFinished({ success: true, report });
      } else {
        await logDeployError({ success: false, report });
      }

      await sendEvents().catch(() => {});

      return {
        success,
        report
      };
    } catch (err) {
      await logDeployError({ success: false, error: (err as Error)?.message });
      await sendEvents().catch(() => {});
      throw err;
    }
  }
}
