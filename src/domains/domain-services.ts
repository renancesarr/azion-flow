import { ApplicationService } from "./application/application.service";
import { BucketService } from "./storage/services/bucket.service";
import { DomainConfigService } from "./storage/configs/domain-config.service";
import { FileSyncService } from "./storage/services/file-sync.service";

export interface DomainServices {
  bucketService: BucketService;
  fileSyncService: FileSyncService;
  applicationService: ApplicationService;
  domainConfigService: DomainConfigService;
}
