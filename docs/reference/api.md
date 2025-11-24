# Referência de API — azion-flow

## CLI

- `azion-flow deploy [flags]`: executa pipeline de deploy. Veja `docs/user/commands.md` para flags e uso.

## Fábricas e Use Cases

- `createDeployUseCase({ token, services?, providers?, stepLogger? })`
  - `token` (string, obrigatório): token da Azion.
  - `services` (opcional): injete serviços para teste/customização.
  - `providers` (opcional): injete providers (ex.: HTTP mock).
  - Retorna `DeployUseCase`.
- `DeployUseCase.execute(initialContext?)`
  - `initialContext` pode conter `projectRoot`, `buildDir`, `bucketName`, `domain`, `applicationId`, `token`.
  - Retorna `{ success: boolean; report: Record<string, unknown> }`.

## Providers

- `AzionHttpClient({ token, baseUrl?, fetchImpl? })`
  - Métodos: `request({ path, method?, headers?, body? })` → `{ status, data, headers }`.
- `AzionStorageProvider({ token, http? })`
  - `listBuckets()`, `ensureBucket(name)`.
- `AzionApplicationProvider({ token, http? })`
  - `listApplications()`.
- `AzionDomainProvider({ token, http? })`
  - `getDomainConfig(id)`, `ensureDomain(domain)`.

## Services

- `BucketService`: `listBuckets()`, `ensureBucket(name)`.
- `FileSyncService`: `sync(buildDir, bucketName)`.
- `ApplicationService`: `listApplications()`, `selectApplication(options)`.
- `DomainConfigService`: `getConfig(id)`, `ensureDomain(domainName)`.
- `ConfigStorageService`: `loadConfig()`.

## Utilidades CLI

- `promptTokenIfNeeded()`: pergunta token se não houver token carregado.
- `createCliStepLogger(silent?)`: logger simples respeitando `--silent`.
