# Tasks — Migrar Providers para Domains (azion-flow)

Objetivo: mover e alinhar todos os providers de `src/providers` para a estrutura de domínios em `src/domains`, seguindo o modelo real (Applications, Storage, DomainConfig e backlog para Auth, DNS, DigitalCertificates, Firewalls, Functions, WAFs). Durante a migração: ajustar imports/exports, naming e caminhos em usecases/CLI/tests.

## Storage
- [ ] **TP2D-STO-001 — Mover AzionStorageProvider para `src/domains/storage/providers/azion.storage.ts`**
- [ ] **TP2D-STO-002 — Mover AzionCredentialsProvider para `src/domains/storage/providers/azion.credentials.ts`**
- [ ] **TP2D-STO-003 — Mover DTOs de storage (bucket/credential) para `src/domains/storage/dtos/`**
- [ ] **TP2D-STO-004 — Ajustar endpoints storage em `src/domains/storage/providers/http/endpoints.ts` (ou consolidar em http compartilhado no domínio)**
- [ ] **TP2D-STO-005 — Atualizar imports em services, usecases e tests para novos caminhos de storage**

## Applications
- [ ] **TP2D-APP-001 — Mover AzionApplicationProvider para `src/domains/applications/providers/azion.application.ts`**
- [ ] **TP2D-APP-002 — Mover DTO de application para `src/domains/applications/dtos/`**
- [ ] **TP2D-APP-003 — Ajustar imports em services, usecases e tests para novos caminhos de applications**

## DomainConfig
- [ ] **TP2D-DOM-001 — Mover AzionDomainProvider para `src/domains/domain-config/providers/azion.domain.ts`**
- [ ] **TP2D-DOM-002 — Mover DTO de domain para `src/domains/domain-config/dtos/`**
- [ ] **TP2D-DOM-003 — Ajustar imports em services, usecases e tests para novos caminhos de domain-config**

## HTTP client compartilhado
- [ ] **TP2D-HTTP-001 — Consolidar AzionHttpClient em `src/domains/shared/http/azion-http-client.ts`**
- [ ] **TP2D-HTTP-002 — Consolidar endpoints Azion em `src/domains/shared/http/endpoints.ts`**
- [ ] **TP2D-HTTP-003 — Ajustar token-store/tipagens para o novo caminho (se mantidos)**
- [ ] **TP2D-HTTP-004 — Atualizar imports de todos os providers/services/usecases para o novo path de HTTP**

## Filesystem/Config providers
- [ ] **TP2D-FS-001 — Mover NodeFileSystemProvider para `src/domains/shared/fs/nodefs.ts` (ou `src/core/utils/fs` se preferir manter no core)**
- [ ] **TP2D-CONF-001 — Mover FileConfigProvider para `src/domains/shared/config/file-config.ts` ou substituí-lo por helpers em `core/utils/configs`**
- [ ] **TP2D-CONF-002 — Remover/provider stub se não for usado; alinhar com helpers de config**

## Exports e uso
- [ ] **TP2D-EXP-001 — Atualizar `src/domains/index.ts` para exportar providers/dtos apenas pelos novos caminhos**
- [ ] **TP2D-EXP-002 — Atualizar `src/domains/services.factory.ts` para consumir providers nos novos caminhos**
- [ ] **TP2D-EXP-003 — Atualizar CLI e usecases para novos imports**
- [ ] **TP2D-EXP-004 — Atualizar tests para novos caminhos de providers/domínios**

## Limpeza
- [ ] **TP2D-CLEAN-001 — Remover pasta `src/providers` após migração completa**
- [ ] **TP2D-CLEAN-002 — Registrar no backlog pontos pendentes (ex.: futuros domínios Auth/DNS/Cert/Firewalls/Functions/WAFs e logger/error handling)**
