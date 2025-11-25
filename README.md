# azion-flow

CLI para deploy estático na Azion com pipeline previsível, logs claros e pronto para automação.

![npm version](https://img.shields.io/npm/v/azion-flow.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![build](https://img.shields.io/badge/build-tsup-green.svg)

## O que resolve

- Padroniza deploys estáticos na Azion via CLI única.
- Orquestra bucket, sync, aplicação e domínio em um fluxo único.
- Evita dependência de painel manual ou scripts soltos.

## Principais features

- Pipeline de deploy opinado (`resolve-paths` → `validate` → `bucket` → `sync` → `app` → `domain` → `report`).
- Providers da Azion isolados (HTTP client único, storage, application, domain).
- Logs estruturados e saída em `--json` para automação/CI.
- Pronto para coleta/validação de token via prompt.

## Instalação

```bash
npm i -g azion-flow
```

Requisitos: Node 18+ e acesso à internet para falar com a Azion.

## Uso básico

```bash
azion-flow deploy --build-dir dist --domain example.com --bucket my-bucket
```

- Token: será pedido no primeiro uso e armazenado em memória da sessão.
- Saída JSON: `azion-flow deploy --json`.
- Modo silencioso: `azion-flow deploy --silent`.

### Screenshot textual da CLI

```text
azion-flow • static deploy on edge, simplified
Resumo do deploy
Bucket      my-bucket
App         n/a
Domain      example.com
Uploaded    42
Skipped     3
```

## Exemplos rápidos

- Deploy mínimo: `examples/basic-deploy/`
- Domínio customizado: `examples/custom-domain/`
- Múltiplas pastas: `examples/multi-folder/`

## Roadmap curto

- Novos providers (Cloudflare/S3).
- Novos comandos (purge, preview).
- Validação de config + telemetria opt-in.

## Documentação

- Guia do usuário: `docs/user/`
- Arquitetura: `docs/architecture/`
- Referência técnica: `docs/reference/`
- Guia de contribuição: `CONTRIBUTING.md`

## Licença

MIT.
