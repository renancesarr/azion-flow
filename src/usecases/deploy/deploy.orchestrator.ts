type DeployStepCtor = new (services?: any, providers?: any) => { execute: (context: any) => Promise<void> };

interface DeployRunResult {
  context: any;
  success: boolean;
}

export class DeployOrchestrator {
  private readonly steps: DeployStepCtor[];
  private readonly services: any;
  private readonly providers: any;
  private readonly context: any;

  constructor(steps: DeployStepCtor[], services: any, providers: any, context: any = {}) {
    this.steps = steps;
    this.services = services;
    this.providers = providers;
    this.context = {
      report: { errors: [], timings: {}, ...(context?.report ?? {}) },
      ...context
    };
  }

  async run(partialContext: any = {}): Promise<DeployRunResult> {
    this.mergeContext(partialContext);
    for (const Step of this.steps) {
      const stepInstance = new Step(this.services, this.providers);
      const stepName = Step.name;
      const startedAt = Date.now();
      try {
        this.log(`Starting step: ${stepName}`);
        await stepInstance.execute(this.context);
      } catch (err: any) {
        this.registerError(stepName, err);
        this.log(`Error on step ${stepName}: ${err?.message ?? err}`);
        return { context: this.context, success: false };
      } finally {
        this.registerTiming(stepName, startedAt, Date.now());
      }
    }
    return { context: this.context, success: true };
  }

  private mergeContext(partial: any): void {
    Object.assign(this.context, partial ?? {});
  }

  private registerError(stepName: string, err: unknown): void {
    if (!this.context.report.errors) this.context.report.errors = [];
    this.context.report.errors.push({ step: stepName, message: (err as any)?.message ?? String(err) });
  }

  private registerTiming(stepName: string, start: number, end: number): void {
    if (!this.context.report.timings) this.context.report.timings = {};
    this.context.report.timings[stepName] = end - start;
  }

  private log(msg: string): void {
    if (process.env.AZION_FLOW_DEBUG) {
      // eslint-disable-next-line no-console
      console.log(msg);
    }
  }
}
