# Tasks — Revisão Arquitetural por Arquivo (azion-flow)

Objetivo: alinhar todo o código à arquitetura core/domains/usecases/telemetry, removendo artefatos obsoletos e reposicionando responsabilidades. Cada task verifica um arquivo específico, confirma utilidade, nome, local e aderência, e remove/move se necessário (com commit explicativo quando excluir).

## CLI (core/cli)

- [x] **TARCH-CLI-001 — Revisar src/cli/banner.ts**
- [x] **TARCH-CLI-002 — Revisar src/cli/bootstrap.ts**
- [x] **TARCH-CLI-003 — Revisar src/cli/commands/deploy.ts**
- [x] **TARCH-CLI-004 — Revisar src/cli/commands/help.ts**
- [x] **TARCH-CLI-005 — Revisar src/cli/commands/storage/buckets.ts**
- [x] **TARCH-CLI-006 — Revisar src/cli/commands/storage/credentials.ts**
- [x] **TARCH-CLI-007 — Revisar src/cli/commands/telemetry.ts**
- [x] **TARCH-CLI-008 — Revisar src/cli/commands/version.ts**
- [x] **TARCH-CLI-009 — Revisar src/cli/index.ts**
- [x] **TARCH-CLI-010 — Revisar src/cli/router.ts**
- [x] **TARCH-CLI-011 — Revisar src/cli/types/command.ts**
- [x] **TARCH-CLI-012 — Revisar src/cli/ui/output.ts**
- [x] **TARCH-CLI-013 — Revisar src/cli/utils/colors.ts**
- [x] **TARCH-CLI-014 — Revisar src/cli/utils/errors.ts**
- [x] **TARCH-CLI-015 — Revisar src/cli/utils/loading.ts**
- [x] **TARCH-CLI-016 — Revisar src/cli/utils/section.ts**
- [x] **TARCH-CLI-017 — Revisar src/cli/utils/step-labels.ts**
- [x] **TARCH-CLI-018 — Revisar src/cli/utils/step-logger.ts**
- [x] **TARCH-CLI-019 — Revisar src/cli/utils/table.ts**
- [x] **TARCH-CLI-020 — Revisar src/cli/utils/token-prompt.ts**

## Core (erros, logger, utils)

- [ ] **TARCH-CORE-001 — Revisar src/core/errors/base-error.ts**
- [ ] **TARCH-CORE-002 — Revisar src/core/errors/error-codes.ts**
- [ ] **TARCH-CORE-003 — Revisar src/core/errors/index.ts**
- [ ] **TARCH-CORE-004 — Revisar src/core/errors/types/.gitkeep** (avaliar necessidade do diretório)
- [ ] **TARCH-CORE-005 — Revisar src/core/logger/adapters/console-logger.ts**
- [ ] **TARCH-CORE-006 — Revisar src/core/logger/logger.ts**
- [ ] **TARCH-CORE-007 — Revisar src/core/logger/types.ts**
- [ ] **TARCH-CORE-008 — Revisar src/core/utils/fs/path.ts**
- [ ] **TARCH-CORE-009 — Revisar src/core/utils/index.ts**
- [ ] **TARCH-CORE-010 — Revisar src/core/utils/text/format.ts**

## Providers (deveriam migrar para domains correspondentes se aplicável)

- [ ] **TARCH-PROV-001 — Revisar src/providers/azion/application/application.dto.ts**
- [ ] **TARCH-PROV-002 — Revisar src/providers/azion/azion.application.ts**
- [ ] **TARCH-PROV-003 — Revisar src/providers/azion/azion.credentials.ts**
- [ ] **TARCH-PROV-004 — Revisar src/providers/azion/azion.domain.ts**
- [ ] **TARCH-PROV-005 — Revisar src/providers/azion/azion.storage.ts**
- [ ] **TARCH-PROV-006 — Revisar src/providers/azion/domain/domain.dto.ts**
- [ ] **TARCH-PROV-007 — Revisar src/providers/azion/http/endpoints.ts**
- [ ] **TARCH-PROV-008 — Revisar src/providers/azion/http/http-client.ts**
- [ ] **TARCH-PROV-009 — Revisar src/providers/azion/http/http-error.ts**
- [ ] **TARCH-PROV-010 — Revisar src/providers/azion/http/index.ts**
- [ ] **TARCH-PROV-011 — Revisar src/providers/azion/http/token-store.ts**
- [ ] **TARCH-PROV-012 — Revisar src/providers/azion/http/types.ts**
- [ ] **TARCH-PROV-013 — Revisar src/providers/azion/storage/bucket.dto.ts**
- [ ] **TARCH-PROV-014 — Revisar src/providers/azion/storage/credential.dto.ts**
- [ ] **TARCH-PROV-015 — Revisar src/providers/config/file-config.ts**
- [ ] **TARCH-PROV-016 — Revisar src/providers/filesystem/filesync.dto.ts**
- [ ] **TARCH-PROV-017 — Revisar src/providers/filesystem/nodefs.ts**
- [ ] **TARCH-PROV-018 — Revisar src/providers/index.ts**
- [ ] **TARCH-PROV-019 — Revisar src/providers/types.ts**

## Domínios (services/entities)

- [ ] **TARCH-DOM-001 — Revisar src/domain/application/application.entity.ts**
- [ ] **TARCH-DOM-002 — Revisar src/domain/application/application.service.ts**
- [ ] **TARCH-DOM-003 — Revisar src/domain/bucket/bucket.entity.ts**
- [ ] **TARCH-DOM-004 — Revisar src/domain/bucket/bucket.service.ts**
- [ ] **TARCH-DOM-005 — Revisar src/domain/config-storage/config-storage.entity.ts**
- [ ] **TARCH-DOM-006 — Revisar src/domain/config-storage/config-storage.service.ts**
- [ ] **TARCH-DOM-007 — Revisar src/domain/domain-config/domain-config.entity.ts**
- [ ] **TARCH-DOM-008 — Revisar src/domain/domain-config/domain-config.service.ts**
- [ ] **TARCH-DOM-009 — Revisar src/domain/domain-services.ts**
- [ ] **TARCH-DOM-010 — Revisar src/domain/filesync/file-sync.entity.ts**
- [ ] **TARCH-DOM-011 — Revisar src/domain/filesync/file-sync.service.ts**
- [ ] **TARCH-DOM-012 — Revisar src/domain/index.ts**
- [ ] **TARCH-DOM-013 — Revisar src/domain/services.factory.ts**

## Use cases

- [ ] **TARCH-UC-001 — Revisar src/usecases/config/config.usecase.ts**
- [ ] **TARCH-UC-002 — Revisar src/usecases/config/types.ts**
- [ ] **TARCH-UC-003 — Revisar src/usecases/deploy/context.ts**
- [ ] **TARCH-UC-004 — Revisar src/usecases/deploy/deploy.factory.ts**
- [ ] **TARCH-UC-005 — Revisar src/usecases/deploy/deploy.orchestrator.ts**
- [ ] **TARCH-UC-006 — Revisar src/usecases/deploy/deploy.usecase.ts**
- [ ] **TARCH-UC-007 — Revisar src/usecases/deploy/pipeline.ts**
- [ ] **TARCH-UC-008 — Revisar src/usecases/deploy/steps/index.ts**
- [ ] **TARCH-UC-009 — Revisar src/usecases/deploy/steps/raw-steps/ensure-bucket.step.ts**
- [ ] **TARCH-UC-010 — Revisar src/usecases/deploy/steps/raw-steps/ensure-domain.step.ts**
- [ ] **TARCH-UC-011 — Revisar src/usecases/deploy/steps/raw-steps/generate-report.step.ts**
- [ ] **TARCH-UC-012 — Revisar src/usecases/deploy/steps/raw-steps/get-domain-config.step.ts**
- [ ] **TARCH-UC-013 — Revisar src/usecases/deploy/steps/raw-steps/list-applications.step.ts**
- [ ] **TARCH-UC-014 — Revisar src/usecases/deploy/steps/raw-steps/list-buckets.step.ts**
- [ ] **TARCH-UC-015 — Revisar src/usecases/deploy/steps/raw-steps/read-config.step.ts**
- [ ] **TARCH-UC-016 — Revisar src/usecases/deploy/steps/raw-steps/resolve-paths.step.ts**
- [ ] **TARCH-UC-017 — Revisar src/usecases/deploy/steps/raw-steps/select-application.step.ts**
- [ ] **TARCH-UC-018 — Revisar src/usecases/deploy/steps/raw-steps/sync-files.step.ts**
- [ ] **TARCH-UC-019 — Revisar src/usecases/deploy/steps/raw-steps/validate-local-env.step.ts**
- [ ] **TARCH-UC-020 — Revisar src/usecases/deploy/steps/register.ts**
- [ ] **TARCH-UC-021 — Revisar src/usecases/deploy/steps/step.base.ts**
- [ ] **TARCH-UC-022 — Revisar src/usecases/deploy/steps/step.types.ts**
- [ ] **TARCH-UC-023 — Revisar src/usecases/deploy/types.ts**
- [ ] **TARCH-UC-024 — Revisar src/usecases/index.ts**
- [ ] **TARCH-UC-025 — Revisar src/usecases/shared/index.ts**
- [ ] **TARCH-UC-026 — Revisar src/usecases/shared/types.ts**
- [ ] **TARCH-UC-027 — Revisar src/usecases/shared/validators/basic.ts**

## Telemetria

- [ ] **TARCH-TEL-001 — Revisar src/telemetry/buffer.ts**
- [ ] **TARCH-TEL-002 — Revisar src/telemetry/create-event.ts**
- [ ] **TARCH-TEL-003 — Revisar src/telemetry/event.ts**
- [ ] **TARCH-TEL-004 — Revisar src/telemetry/events.ts**
- [ ] **TARCH-TEL-005 — Revisar src/telemetry/events/deploy.ts**
- [ ] **TARCH-TEL-006 — Revisar src/telemetry/send.ts**
- [ ] **TARCH-TEL-007 — Revisar src/telemetry/startup.ts**
- [ ] **TARCH-TEL-008 — Revisar src/telemetry/telemetry.optin.ts**
