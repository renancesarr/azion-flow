type DeployStepCtor = new (services?: any, providers?: any) => { execute: (context: any) => Promise<void> };
type StepLogger = {
  onStart?: (step: string) => void;
  onSuccess?: (step: string) => void;
  onError?: (step: string, err: unknown) => void;
};

interface DeployRunResult {
  context: any;
  success: boolean;
}

export class DeployOrchestrator {
  private readonly steps: DeployStepCtor[];
  private readonly services: any;
  private readonly providers: any;
  private readonly context: any;
  private readonly stepLogger?: StepLogger;

  constructor(steps: DeployStepCtor[], services: any, providers: any, context: any = {}, stepLogger?: StepLogger) {
    this.steps = steps;
    this.services = services;
    this.providers = providers;
    this.stepLogger = stepLogger;
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
        this.logStart(stepName);
        await stepInstance.execute(this.context);
        this.logSuccess(stepName);
      } catch (err: any) {
        this.registerError(stepName, err);
        this.logError(stepName, err);
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

  private logStart(stepName: string): void {
    if (this.stepLogger?.onStart) this.stepLogger.onStart(stepName);
    this.debug(`Starting step: ${stepName}`);
  }

  private logSuccess(stepName: string): void {
    if (this.stepLogger?.onSuccess) this.stepLogger.onSuccess(stepName);
    this.debug(`Finished step: ${stepName}`);
  }

  private logError(stepName: string, err: unknown): void {
    if (this.stepLogger?.onError) this.stepLogger.onError(stepName, err);
    this.debug(`Error on step ${stepName}: ${(err as any)?.message ?? err}`);
  }

  private debug(msg: string): void {
    if (process.env.AZION_FLOW_DEBUG) {
      // eslint-disable-next-line no-console
      console.log(msg);
    }
  }
}
