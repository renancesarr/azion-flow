# Execution Flow — Deploy

## Pipeline real

Ordem dos steps em `DeployOrchestrator`:

1) `ResolvePathsStep` — normaliza `projectRoot` e `buildDir`.
2) `ReadConfigStep` — carrega `config.json` (se existir) e preenche contexto.
3) `ValidateLocalEnvStep` — garante que caminhos existem.
4) `ListBucketsStep` — lista buckets para report.
5) `EnsureBucketStep` — cria/garante o bucket.
6) `SyncFilesStep` — envia artefatos para o bucket.
7) `ListApplicationsStep` — lista aplicações disponíveis.
8) `SelectApplicationStep` — seleciona app se não houver `applicationId`.
9) `GetDomainConfigStep` — lê config de domínio existente.
10) `EnsureDomainStep` — cria/garante domínio.
11) `GenerateReportStep` — fecha relatório com timestamp.

Cada step:

- recebe `context` e pode escrever nele (`context.report` agrega métricas/saídas).
- depende de services, nunca chama providers direto.

## Orquestrador

`DeployUseCase` cria o `DeployOrchestrator` com pipeline fixo e executa `run(initialContext)`. Se algum step lançar erro, a execução para e o erro sobe para a CLI.

## Contexto

Campos mais usados:

- `projectRoot`, `buildDir`
- `bucketName`
- `applicationId`
- `domain`
- `token` (propagado pelo config/prompt)
- `report` (agrega resultados dos steps)

## Relatório final

- `paths`, `validateLocalEnv`, `buckets`, `bucket`, `applications`, `selectedApplication`, `domainConfig`, `domain`, `sync`, `generatedAt`.
- No modo CLI, o relatório é impresso como resumo textual ou JSON (flag `--json`).
