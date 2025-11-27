import { DeployStepBase } from "../step.base";

export class ReadConfigStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    void context; // config storage removido; step mantido como no-op por enquanto
  }
}
