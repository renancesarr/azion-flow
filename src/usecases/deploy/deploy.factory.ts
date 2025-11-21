import { DeployOrchestrator } from "./deploy.orchestrator";
import { DEPLOY_PIPELINE } from "./pipeline";

export function createDeployUseCase(services: any = {}, providers: any = {}): DeployOrchestrator {
  return new DeployOrchestrator(DEPLOY_PIPELINE, services, providers);
}
