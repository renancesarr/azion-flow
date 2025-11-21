import { DeployOrchestrator } from "./deploy.orchestrator";
import { DEPLOY_PIPELINE } from "./pipeline";
import { DeployUseCase } from "./deploy.usecase";

export function createDeployUseCase(services: any = {}, providers: any = {}): DeployUseCase {
  const orchestrator = new DeployOrchestrator(DEPLOY_PIPELINE, services, providers, {});
  return new DeployUseCase(orchestrator);
}
