export function createDeployContext(initial: any = {}): any {
  return {
    projectRoot: initial.projectRoot ?? process.cwd(),
    buildDir: initial.buildDir ?? "",
    bucketName: initial.bucketName,
    applicationId: initial.applicationId,
    domain: initial.domain,
    report: initial.report ?? {}
  };
}
