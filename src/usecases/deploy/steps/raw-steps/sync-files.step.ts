import { DeployStepBase } from "../step.base";

export class SyncFilesStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const fileSyncService = this.services?.fileSyncService;
    const bucketName = context.bucketName;
    const buildDir = context.buildDir;
    const stats = fileSyncService ? await fileSyncService.sync(buildDir, bucketName) : { uploaded: 0 };
    context.report = context.report ?? {};
    context.report.sync = stats;
  }
}
