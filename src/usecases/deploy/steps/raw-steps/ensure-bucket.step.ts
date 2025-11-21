import { DeployStepBase } from "../step.base";

export class EnsureBucketStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const bucketService = this.services?.bucketService;
    const desiredName = context.bucketName ?? "default-bucket";
    const bucket = bucketService ? await bucketService.ensureBucket(desiredName) : { name: desiredName };
    context.bucketName = bucket.name;
    context.report = context.report ?? {};
    context.report.bucket = bucket;
  }
}
