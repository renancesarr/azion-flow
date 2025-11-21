# Batch Executor — azion-flow

## BATCH 0 — Foundation (Fundação do Projeto)

**Objetivo:** Criar o esqueleto mínimo do projeto para permitir construção incremental.

### Tasks

- TCLI-0001 — Criar estrutura inicial da CLI
- TCORE-0001 — Criar pastas core/
- TCORE-0002 — Criar classe principal de contexto
- TCORE-0003 — Criar utilitários de erro

### Dependências

Nenhuma.

---

## BATCH 1 — Domain Layer (Contratos de Domínio)

**Objetivo:** Criar as entidades, modelos e interfaces centrais do domínio.

### Tasks

- TDOMAIN-0001 — Domain bucket model
- TDOMAIN-0002 — Domain application model
- TDOMAIN-0003 — Domain domain-config model
- TDOMAIN-0004 — Domain deploy-result model

### Dependências

- Batch 0 concluído

---

## BATCH 2 — Providers Abstratos (Contratos de Integração)

**Objetivo:** Criar interfaces para permitir implementação dos providers reais.

### Tasks

- TPROV-0001 — Criar interface StorageProvider
- TPROV-0002 — Criar interface ApplicationProvider
- TPROV-0003 — Criar interface DomainConfigProvider
- TPROV-0004 — Criar interface HttpClientProvider

### Dependências

- Batch 1 concluído

---

## BATCH 3 — Providers Reais (Azion)

**Objetivo:** Criar integrações reais com a API da Azion.

### Tasks

- TPROVREAL-0001 — Implementar AzionHttpClient
- TPROVREAL-0002 — Implementar AzionStorageProvider
- TPROVREAL-0003 — Implementar AzionApplicationProvider
- TPROVREAL-0004 — Implementar AzionDomainProvider

### Dependências

- Batch 2 concluído
- Leitura de docs/architecture.md obrigatória

---

## BATCH 4 — Services (Lógica de Negócio)

**Objetivo:** Implementar coordenação lógica entre domínio e providers.

### Tasks

- TSERVREAL-0001 — BucketService
- TSERVREAL-0002 — FileSyncService
- TSERVREAL-0003 — ApplicationService
- TSERVREAL-0004 — DomainConfigService

### Dependências

- Batch 3 concluído

---

## BATCH 5 — Steps (Pipeline de Deploy)

**Objetivo:** Criar os steps reais que compõem o fluxo de deploy.

### Tasks

- TSTEPREAL-0001 — load-config.step
- TSTEPREAL-0002 — validate-config.step
- TSTEPREAL-0003 — pick-bucket.step
- TSTEPREAL-0004 — ensure-bucket.step
- TSTEPREAL-0005 — sync-files.step
- TSTEPREAL-0006 — pick-application.step
- TSTEPREAL-0007 — ensure-domain-config.step
- TSTEPREAL-0008 — finalize-report.step

### Dependências

- Batch 4 concluído

---

## BATCH 6 — Deploy Flow (Orquestrador)

**Objetivo:** Unificar steps em fluxo único determinístico.

### Tasks

- TDEPLOYFLOW-0001 — Criar DeployOrchestrator
- TDEPLOYFLOW-0002 — handle-step-errors
- TDEPLOYFLOW-0003 — summary final
- TDEPLOYFLOW-0004 — integrar domain/service/steps

### Dependências

- Batch 5 concluído

---

## BATCH 7 — CLI UX

**Objetivo:** Transformar a CLI em ferramenta elegante e funcional.

### Tasks

- TCLIUX-0001 — Banner da CLI
- TCLIUX-0002 — ColorService
- TCLIUX-0003 — Load indicators
- TCLIUX-0004 — Flags (--json, --debug, --silent)
- TCLIUX-0005 — Impressão de relatório final

### Dependências

- Orchestrator pronto
- CLI base criada no Batch 0

---

## BATCH 8 — Integração Completa com Azion

**Objetivo:** Validar funcionamento real com API da Azion.

### Tasks

- TINTEGRATION-0001 — bucket real
- TINTEGRATION-0002 — upload real
- TINTEGRATION-0003 — aplicação real
- TINTEGRATION-0004 — domínio real
- TINTEGRATION-0005 — deploy e2e

### Dependências

- Batches 0–7 completos

---

## BATCH 9 — Release

**Objetivo:** Publicar CLI como produto público.

### Tasks

- TREL-0001 — build de release
- TREL-0002 — npm publish
- TREL-0003 — workflows GitHub
- TREL-0004 — validação pós-build

### Dependências

- Integração real funcionando

---

## BATCH 10 — Documentação Final

**Objetivo:** Criar documentação completa.

### Tasks

- TDOC-0001 — README final
- TDOC-0002 — Guia de instalação
- TDOC-0003 — Guia de comandos
- TDOC-0004 — Docs de arquitetura
- TDOC-0005 — Exemplos de uso
- TDOC-0006 — Contributing.md

### Dependências

- Tudo construído

---

## BATCH 11 — Telemetria Opcional

**Objetivo:** Criar telemetria anônima e opt-in.

### Tasks

- TTEL-0001 — opt-in/out
- TTEL-0002 — buffer local
- TTEL-0003 — envio remoto opcional
- TTEL-0004 — integração com deploy flow

### Dependências

- CLI estável
