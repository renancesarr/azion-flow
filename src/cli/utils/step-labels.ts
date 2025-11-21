const STEP_LABELS: Record<string, string> = {
  ValidateLocalEnvStep: "Validando ambiente",
  ReadConfigStep: "Lendo configurações",
  ResolvePathsStep: "Resolvendo paths",
  ListBucketsStep: "Listando buckets",
  EnsureBucketStep: "Garantindo bucket",
  SyncFilesStep: "Sincronizando arquivos",
  ListApplicationsStep: "Listando aplicações",
  SelectApplicationStep: "Selecionando aplicação",
  GetDomainConfigStep: "Obtendo config de domínio",
  EnsureDomainStep: "Garantindo domínio",
  GenerateReportStep: "Gerando relatório"
};

export function labelForStep(stepName: string): string {
  return STEP_LABELS[stepName] ?? stepName;
}
