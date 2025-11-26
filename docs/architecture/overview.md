# Overview — Arquitetura do azion-flow

## Visão geral

O azion-flow usa a API v4 da Azion para entregar um fluxo de deploy via CLI. A arquitetura é dividida em **core** (infra/UX) e **domains** (regras + integração Azion), mantendo isolamento e SOLID para que falhas em um domínio não quebrem outros.

## Camadas e diretórios

- `src/core`: erros, logger, http client, utilidades/constantes compartilhadas. A CLI permanece aqui por enquanto (`src/cli`) para parsing de flags, UX e roteamento.
- `src/domains`: cada domínio agrupa entidades, DTOs, services e providers Azion. Domínios alvo: Applications, Auth, DNS, DigitalCertificates, Firewalls, Functions, Storage, WAFs.
- `src/usecases`: orquestradores finos (ex.: deploy) e steps que compõem serviços dos domínios.
- `docs/tutorials` e `docs/tasks`: material de apoio e rastreabilidade.

## Fluxo de informação

1) CLI coleta args/token e invoca o use case.  
2) Use case encadeia steps sobre um contexto de deploy.  
3) Steps chamam services de domínio (regra de negócio).  
4) Services delegam IO aos providers do domínio (HTTP Azion v4, filesystem, config).  
5) Resultado volta ao use case e CLI (tabela, JSON, logs amigáveis).

## O que cada domínio contém

- **Entities/DTOs**: forma dos dados usados na regra e vindo da Azion.
- **Providers**: adaptação HTTP para API v4 (chamadas e parsing).
- **Services**: regra de negócio local (decidir bucket, sync, selecionar app/domain etc.).
- **Tests**: mocks de providers para garantir comportamento sem depender de rede.

## Regras de dependência

- Domínios não importam código de outros domínios (apenas contratos compartilhados em core/shared).
- Use cases orquestram domínios, mas não contêm regra de negócio pesada.
- CLI fala apenas com use cases ou serviços agregados (não com providers diretamente, salvo comandos utilitários específicos).

## Tokens, config e observabilidade

- Token é coletado via CLI (`token-prompt`) e mantido em memória (token-store). Flags `--token` podem setar explicitamente.
- Config local: `.azionflow/*` (ex.: telemetry opt-in, config futura).
- Telemetria é opt-in; eventos são bufferizados em `.azionflow/events.log` e enviados se habilitado.

## Direções futuras

- Consolidar domínios listados (Applications, Auth, DNS, DigitalCertificates, Firewalls, Functions, Storage, WAFs) com providers v4 específicos.
- Possível extração da CLI para módulo separado mantendo `core` leve.
- Fortalecer shared/constantes em `core` para reduzir acoplamento entre domínios.
