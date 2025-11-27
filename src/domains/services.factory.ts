import { AzionApplicationProvider } from "../providers/azion/azion.application";
import { AzionDomainProvider } from "../providers/azion/azion.domain";
import { AzionStorageProvider } from "../providers/azion/azion.storage";
import { FileConfigProvider } from "../providers/config/file-config";
import { NodeFileSystemProvider } from "../providers/filesystem/nodefs";
import { AzionHttpClient } from "../providers/azion/http/http-client";
import { ApplicationService } from "./application/application.service";
import { BucketService } from "./storage/bucket.service";
import { DomainConfigService } from "./domain-config/domain-config.service";
import { FileSyncService } from "./storage/file-sync.service";
import type { DomainServices } from "./domain-services";

type Providers = {
  storageProvider?: any;
  applicationProvider?: any;
  domainProvider?: any;
  fsProvider?: any;
  httpProvider?: any;
};

type DomainServiceFactoryOptions = { providers?: Providers; token: string };

export function createDomainServices({ providers = {}, token }: DomainServiceFactoryOptions): DomainServices {
  const resolvedToken = token?.trim();
  if (!resolvedToken) {
    throw new Error("AZION_TOKEN ausente: forneça um token ao criar os domain services.");
  }

  const httpProvider = providers.httpProvider ?? new AzionHttpClient({ token: resolvedToken });
  const resolvedProviders = {
    storageProvider: providers.storageProvider ?? new AzionStorageProvider({ token: resolvedToken, http: httpProvider }),
    applicationProvider: providers.applicationProvider ?? new AzionApplicationProvider({ token: resolvedToken, http: httpProvider }),
    domainProvider: providers.domainProvider ?? new AzionDomainProvider({ token: resolvedToken, http: httpProvider }),
    fsProvider: providers.fsProvider ?? new NodeFileSystemProvider(),
    httpProvider
  };

  return {
    bucketService: new BucketService(resolvedProviders.storageProvider),
    fileSyncService: new FileSyncService(resolvedProviders.fsProvider, resolvedProviders.storageProvider),
    applicationService: new ApplicationService(resolvedProviders.applicationProvider),
    domainConfigService: new DomainConfigService(resolvedProviders.domainProvider)
  };
}
