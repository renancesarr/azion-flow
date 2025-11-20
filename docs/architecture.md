# Architecture — azion-flow

Este documento descreve a arquitetura do azion-flow, mantendo o projeto
100% dentro da CLI, com modularidade, simplicidade, alta manutenibilidade e pronta
para evolução incremental. É direto, claro e projetado para que humanos e IAs
trabalhem sem atrito.

---

## Objetivos Arquiteturais

- Simplicidade máxima com capacidade de expansão.
- Modularidade por domínio (vertical slices).
- Use Cases como orquestradores centrais.
- Steps pequenos, isolados e testáveis.
- Providers plugáveis (Azion hoje, outros amanhã).
- Domínio independente de infraestrutura.
- CLI apenas como interface fina.

---

## Arquitetura Geral

O azion-flow segue o modelo:

- CLI → Use Case → Steps → Domain Services → Providers (Infra)

Cada parte tem responsabilidade única.

---

## Estrutura de Pastas (Otimizada)

```dir
src/
  core/
    context/
    errors/
    utils/
    logger/

  cli/
    index.ts
    commands/
      deploy/
      config/
      info/

  usecases/
    deploy/
      deploy.usecase.ts
      steps/
        config.step.ts
        auth.step.ts
        bucket.step.ts
        sync.step.ts
        app.step.ts
        domain.step.ts
        result.step.ts

    config/
    shared/

  domain/
    bucket/
      bucket.entity.ts
      bucket.service.ts

    filesync/
      file-sync.service.ts

    application/
      application.entity.ts
      application.service.ts

    domain-config/
      domain-config.entity.ts
      domain-config.service.ts

    config-storage/
      config-storage.entity.ts
      config-storage.service.ts

  providers/
    azion/
      azion.storage.ts
      azion.application.ts
      azion.domain.ts
      azion.http.ts

    filesystem/
      nodefs.ts

    config/
      file-config.ts
```

---

## Estilo Arquitetural

### 1. Vertical Slices

Cada domínio contém:

- entidades
- serviços
- portas
- steps (quando aplicável)
- testes

Nada de camadas artificiais. Cada módulo tem tudo que precisa.

---

### 2. Use Cases como Orquestradores

Exemplo do fluxo de deploy:

```txt
DeployUseCase
  ⮑ ConfigStep
  ⮑ AuthStep
  ⮑ BucketStep
  ⮑ SyncStep
  ⮑ ApplicationStep
  ⮑ DomainStep
  ⮑ ResultStep
```

**Vantagens:**

- steps pequenos e testáveis
- ordem clara
- fácil adicionar/remover etapas
- fácil para IA navegar

---

## Domínio

O domínio contém **regras de negócio reais**, sem HTTP ou filesystem.

### Entities

- Bucket
- Application
- DeploymentContext
- DeploymentResult
- DomainConfig
- ConfigStorage

### Services (poucos, coesos)

- BucketService
- FileSyncService
- ApplicationService
- DomainConfigService
- ConfigStorageService

Esses serviços dizem ao sistema _o que deve ser feito_, não _como é feito_.

---

## Providers (Infraestrutura Burra)

Os providers só executam operações externas.

Exemplos:

- `AzionStorage`
- `AzionApplication`
- `AzionDomain`
- `NodeFs`
- `FileConfig`

Eles não contêm lógica de negócio.

---

## Core (motor invisível)

```dir
src/core/
  context/     → motor de execução
  errors/      → erros estruturados
  logger/      → saída estruturada
  utils/       → funções atômicas
```

Isso evita espalhar helpers pelo projeto e mantém consistência.

---

## CLI

A CLI só faz:

- ler argumentos
- passar para o Use Case
- receber retorno
- exibir resultado

Nada além disso.

---

## Evolução Planejada

### Fase 1 — Atual

- CLI modular
- Provider Azion
- Steps claros
- Documentação completa

### Fase 2 — Expansão

- Providers plugáveis (Cloudflare, S3, Vercel)
- Comandos novos (purge, invalidate, preview)

### Fase 3 — Produto

- engine remota opcional
- workers de deploy
- compatível com pipelines

---
