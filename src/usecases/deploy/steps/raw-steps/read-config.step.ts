import { DeployStepBase } from "../step.base";

export class ReadConfigStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const storage = this.services?.configStorageService;
    const config = storage?.loadConfig ? await storage.loadConfig() : null;
    if (config && typeof config === "object") {
      Object.assign(context, config);
      context.report = context.report ?? {};
      context.report.config = config;

      // Propaga token para o HTTP client, se existir
      if (config.token && this.providers?.httpProvider) {
        this.providers.httpProvider.token = config.token;
      }
      if (config.token) {
        context.token = config.token;
      }
    }
  }
}
