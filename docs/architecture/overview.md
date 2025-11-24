# Overview — Arquitetura do azion-flow

## Visão geral

O azion-flow segue um fluxo direto: **CLI → Use Case → Steps → Services → Providers**. Cada camada é pequena, testável e substituível.

## Fluxo de informação

- CLI coleta args e token, instancia o deploy use case.
- Use case encadeia steps que leem/escrevem no `context`.
- Services aplicam regra de negócio (ex.: escolher bucket, sincronizar arquivos).
- Providers executam infraestrutura (HTTP Azion, filesystem).

## Onde está cada coisa

- `src/cli`: entrada CLI, parsing de flags, step logger.
- `src/usecases/deploy`: orquestrador, fábrica e steps de deploy.
- `src/domain`: serviços de domínio (bucket, filesync, application, domain-config, config-storage).
- `src/providers`: implementações Azion e filesystem/config; HTTP client dedicado.
- `src/core`: utilitários compartilhados (context, logger, errors, utils).

## Filosofia

- Vertical slices por domínio.
- Use cases como orquestradores finos.
- Providers “burros” (somente IO).
- Domínio sem dependência de infraestrutura.
