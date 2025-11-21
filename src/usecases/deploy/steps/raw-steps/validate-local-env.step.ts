import { existsSync } from "node:fs";
import { DeployStepBase } from "../step.base";

export class ValidateLocalEnvStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void providers;
  }

  async execute(context: any): Promise<void> {
    const projectRoot = context.projectRoot;
    const buildDir = context.buildDir;
    const ok =
      typeof projectRoot === "string" &&
      projectRoot.length > 0 &&
      typeof buildDir === "string" &&
      buildDir.length > 0 &&
      existsSync(projectRoot);

    if (!ok) {
      throw new Error("Invalid projectRoot or buildDir");
    }

    context.report = context.report ?? {};
    context.report.validateLocalEnv = { projectRoot, buildDir, exists: ok };
    // optional: verify build path if exists
    context.report.validateLocalEnv.buildExists = existsSync(buildDir);
  }
}
