import { AzionApplicationProvider } from "../providers/azion/azion.application";
import { AzionDomainProvider } from "../providers/azion/azion.domain";
import { AzionStorageProvider } from "../providers/azion/azion.storage";
import { FileConfigProvider } from "../providers/config/file-config";
import { NodeFileSystemProvider } from "../providers/filesystem/nodefs";
import { ApplicationService } from "./application/application.service";
import { BucketService } from "./bucket/bucket.service";
import { ConfigStorageService } from "./config-storage/config-storage.service";
import { DomainConfigService } from "./domain-config/domain-config.service";
import { FileSyncService } from "./filesync/file-sync.service";
import type { DomainServices } from "./domain-services";

type Providers = {
  storageProvider?: any;
  applicationProvider?: any;
  domainProvider?: any;
  fsProvider?: any;
  configProvider?: any;
  httpProvider?: any;
};

export function createDomainServices(providers: Providers = {}): DomainServices {
  const resolvedProviders = {
    storageProvider: providers.storageProvider ?? new AzionStorageProvider(),
    applicationProvider: providers.applicationProvider ?? new AzionApplicationProvider(),
    domainProvider: providers.domainProvider ?? new AzionDomainProvider(),
    fsProvider: providers.fsProvider ?? new NodeFileSystemProvider(),
    configProvider: providers.configProvider ?? new FileConfigProvider(),
    httpProvider: providers.httpProvider ?? providers.storageProvider
  };

  return {
    bucketService: new BucketService(resolvedProviders.storageProvider),
    fileSyncService: new FileSyncService(resolvedProviders.fsProvider, resolvedProviders.storageProvider),
    applicationService: new ApplicationService(resolvedProviders.applicationProvider),
    domainConfigService: new DomainConfigService(resolvedProviders.domainProvider),
    configStorageService: new ConfigStorageService(resolvedProviders.configProvider)
  };
}
