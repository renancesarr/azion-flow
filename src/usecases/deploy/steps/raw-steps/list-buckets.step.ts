import { DeployStepBase } from "../step.base";

export class ListBucketsStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const bucketService = this.services?.bucketService;
    const buckets = bucketService ? await bucketService.listBuckets() : [];
    context.report = context.report ?? {};
    context.report.buckets = buckets;
  }
}
