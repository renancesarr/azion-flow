import {
  EnsureBucketStep,
  EnsureDomainStep,
  GenerateReportStep,
  GetDomainConfigStep,
  ListApplicationsStep,
  ListBucketsStep,
  ReadConfigStep,
  ResolvePathsStep,
  SelectApplicationStep,
  SyncFilesStep,
  ValidateLocalEnvStep
} from "./steps";

export const DEPLOY_PIPELINE = [
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
