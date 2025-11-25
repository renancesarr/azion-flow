export interface CoreContext {
  projectRoot: string;
  buildDir: string;
  bucketName?: string;
  applicationId?: string;
  domain?: string;
  report: Record<string, unknown>;
}

export function createDeployContext(initial: Partial<CoreContext> = {}): CoreContext {
  return {
    projectRoot: initial.projectRoot ?? process.cwd(),
    buildDir: initial.buildDir ?? "",
    bucketName: initial.bucketName,
    applicationId: initial.applicationId,
    domain: initial.domain,
    report: initial.report ?? {}
  };
}
