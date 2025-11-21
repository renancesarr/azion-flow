import path from "node:path";
import { DeployStepBase } from "../step.base";

export class ResolvePathsStep extends DeployStepBase {
  constructor(private readonly services: any = {}, private readonly providers: any = {}) {
    super();
    void services;
    void providers;
  }

  async execute(context: any): Promise<void> {
    const projectRoot = context.projectRoot ?? process.cwd();
    const buildDir = context.buildDir ?? "";
    context.projectRoot = path.isAbsolute(projectRoot) ? projectRoot : path.resolve(projectRoot);
    context.buildDir = path.isAbsolute(buildDir) ? buildDir : path.resolve(projectRoot, buildDir);
    context.report = context.report ?? {};
    context.report.paths = { projectRoot: context.projectRoot, buildDir: context.buildDir };
  }
}
