import { EnsureBucketStep } from "./raw-steps/ensure-bucket.step";
import { EnsureDomainStep } from "./raw-steps/ensure-domain.step";
import { GenerateReportStep } from "./raw-steps/generate-report.step";
import { GetDomainConfigStep } from "./raw-steps/get-domain-config.step";
import { ListApplicationsStep } from "./raw-steps/list-applications.step";
import { ListBucketsStep } from "./raw-steps/list-buckets.step";
import { ReadConfigStep } from "./raw-steps/read-config.step";
import { ResolvePathsStep } from "./raw-steps/resolve-paths.step";
import { SelectApplicationStep } from "./raw-steps/select-application.step";
import { SyncFilesStep } from "./raw-steps/sync-files.step";
import { ValidateLocalEnvStep } from "./raw-steps/validate-local-env.step";

export const STEP_REGISTRY = [
  ValidateLocalEnvStep,
  ReadConfigStep,
  ResolvePathsStep,
  ListBucketsStep,
  EnsureBucketStep,
  SyncFilesStep,
  ListApplicationsStep,
  SelectApplicationStep,
  GetDomainConfigStep,
  EnsureDomainStep,
  GenerateReportStep
];
