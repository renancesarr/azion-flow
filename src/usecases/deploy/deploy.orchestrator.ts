export class DeployOrchestrator {
  constructor(
    private readonly steps: Array<new () => { execute: (context: any) => Promise<void> }>,
    private readonly services: any,
    private readonly providers: any
  ) {
    void services;
    void providers;
  }

  async run(context: any): Promise<void> {
    for (const Step of this.steps) {
      const stepInstance = new Step();
      await stepInstance.execute(context);
    }
  }
}
