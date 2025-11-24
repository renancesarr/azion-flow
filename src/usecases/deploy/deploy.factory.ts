import { DeployOrchestrator } from "./deploy.orchestrator";
import { DEPLOY_PIPELINE } from "./pipeline";
import { DeployUseCase } from "./deploy.usecase";
import { AzionStorageProvider } from "../../providers/azion/azion.storage";
import { AzionApplicationProvider } from "../../providers/azion/azion.application";
import { AzionDomainProvider } from "../../providers/azion/azion.domain";
import { AzionHttpClient } from "../../providers/azion/http/http-client";
import { NodeFileSystemProvider } from "../../providers/filesystem/nodefs";
import { FileConfigProvider } from "../../providers/config/file-config";
import { BucketService } from "../../domain/bucket/bucket.service";
import { FileSyncService } from "../../domain/filesync/file-sync.service";
import { ApplicationService } from "../../domain/application/application.service";
import { DomainConfigService } from "../../domain/domain-config/domain-config.service";
import { ConfigStorageService } from "../../domain/config-storage/config-storage.service";

type DeployFactoryOptions = {
  services?: any;
  providers?: any;
  stepLogger?: any;
  token: string;
};

export function createDeployUseCase({ services = {}, providers = {}, stepLogger, token }: DeployFactoryOptions): DeployUseCase {
  const resolvedToken = token?.trim();
  if (!resolvedToken) {
    throw new Error("AZION_TOKEN ausente: forneça um token ao criar o DeployUseCase.");
  }

  const httpProvider = providers.httpProvider ?? new AzionHttpClient({ token: resolvedToken });
  const resolvedProviders = {
    storageProvider: providers.storageProvider ?? new AzionStorageProvider({ token: resolvedToken, http: httpProvider }),
    applicationProvider: providers.applicationProvider ?? new AzionApplicationProvider({ token: resolvedToken, http: httpProvider }),
    domainProvider: providers.domainProvider ?? new AzionDomainProvider({ token: resolvedToken, http: httpProvider }),
    fsProvider: providers.fsProvider ?? new NodeFileSystemProvider(),
    configProvider: providers.configProvider ?? new FileConfigProvider(),
    httpProvider
  };

  const resolvedServices = {
    bucketService: services.bucketService ?? new BucketService(resolvedProviders.storageProvider),
    fileSyncService: services.fileSyncService ?? new FileSyncService(resolvedProviders.fsProvider, resolvedProviders.storageProvider),
    applicationService:
      services.applicationService ?? new ApplicationService(resolvedProviders.applicationProvider),
    domainConfigService: services.domainConfigService ?? new DomainConfigService(resolvedProviders.domainProvider),
    configStorageService: services.configStorageService ?? new ConfigStorageService(resolvedProviders.configProvider)
  };

  const orchestrator = new DeployOrchestrator(DEPLOY_PIPELINE, resolvedServices, resolvedProviders, {}, stepLogger);
  return new DeployUseCase(orchestrator);
}
