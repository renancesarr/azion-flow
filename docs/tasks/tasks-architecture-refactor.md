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

- [x] **TARCH-CORE-001 — Revisar src/core/errors/base-error.ts**
- [x] **TARCH-CORE-002 — Revisar src/core/errors/error-codes.ts**
- [x] **TARCH-CORE-003 — Revisar src/core/errors/index.ts**
- [x] **TARCH-CORE-004 — Revisar src/core/errors/types/.gitkeep** (avaliar necessidade do diretório)
- [x] **TARCH-CORE-005 — Revisar src/core/logger/adapters/console-logger.ts** (removido; backlog para logger real)
- [x] **TARCH-CORE-006 — Revisar src/core/logger/logger.ts** (removido; backlog para logger real)
- [x] **TARCH-CORE-007 — Revisar src/core/logger/types.ts** (removido; backlog para logger real)
- [x] **TARCH-CORE-008 — Revisar src/core/utils/fs/path.ts**
- [x] **TARCH-CORE-009 — Revisar src/core/utils/index.ts**
- [x] **TARCH-CORE-010 — Revisar src/core/utils/text/format.ts**

## Providers (deveriam migrar para domains correspondentes se aplicável)

- [x] **TARCH-PROV-001 — Revisar src/providers/azion/application/application.dto.ts**
- [x] **TARCH-PROV-002 — Revisar src/providers/azion/azion.application.ts**
- [x] **TARCH-PROV-003 — Revisar src/providers/azion/azion.credentials.ts**
- [x] **TARCH-PROV-004 — Revisar src/providers/azion/azion.domain.ts**
- [x] **TARCH-PROV-005 — Revisar src/providers/azion/azion.storage.ts**
- [x] **TARCH-PROV-006 — Revisar src/providers/azion/domain/domain.dto.ts**
- [x] **TARCH-PROV-007 — Revisar src/providers/azion/http/endpoints.ts**
- [x] **TARCH-PROV-008 — Revisar src/providers/azion/http/http-client.ts**
- [x] **TARCH-PROV-009 — Revisar src/providers/azion/http/http-error.ts** (removido em commit anterior)
- [x] **TARCH-PROV-010 — Revisar src/providers/azion/http/index.ts**
- [x] **TARCH-PROV-011 — Revisar src/providers/azion/http/token-store.ts**
- [x] **TARCH-PROV-012 — Revisar src/providers/azion/http/types.ts**
- [x] **TARCH-PROV-013 — Revisar src/providers/azion/storage/bucket.dto.ts**
- [x] **TARCH-PROV-014 — Revisar src/providers/azion/storage/credential.dto.ts**
- [x] **TARCH-PROV-015 — Revisar src/providers/config/file-config.ts**
- [x] **TARCH-PROV-016 — Revisar src/providers/filesystem/filesync.dto.ts**
- [x] **TARCH-PROV-017 — Revisar src/providers/filesystem/nodefs.ts**
- [x] **TARCH-PROV-018 — Revisar src/providers/index.ts**
- [x] **TARCH-PROV-019 — Revisar src/providers/types.ts**

## Domínios (services) — namespace `src/domains`

- [x] **TARCH-DOM-001 — Revisar src/domains/application/application.service.ts**
- [x] **TARCH-DOM-002 — Revisar src/domains/storage/services/bucket.service.ts**
- [x] **TARCH-DOM-003 — Revisar src/domains/storage/services/file-sync.service.ts**
- [x] **TARCH-DOM-004 — Revisar src/domains/storage/configs/domain-config.service.ts**
- [x] **TARCH-DOM-005 — Revisar src/domains/domain-services.ts**
- [x] **TARCH-DOM-006 — Revisar src/domains/index.ts**
- [x] **TARCH-DOM-007 — Revisar src/domains/services.factory.ts**

Domínios futuros (backlog, não no checklist): Auth, DNS, DigitalCertificates, Firewalls, Functions, WAFs.

## Use cases

- [x] **TARCH-UC-001 — Revisar src/usecases/config/config.usecase.ts**
- [x] **TARCH-UC-002 — Revisar src/usecases/config/types.ts**
- [x] **TARCH-UC-003 — Revisar src/usecases/deploy/context.ts**
- [x] **TARCH-UC-004 — Revisar src/usecases/deploy/deploy.factory.ts**
- [x] **TARCH-UC-005 — Revisar src/usecases/deploy/deploy.orchestrator.ts**
- [x] **TARCH-UC-006 — Revisar src/usecases/deploy/deploy.usecase.ts**
- [x] **TARCH-UC-007 — Revisar src/usecases/deploy/pipeline.ts**
- [x] **TARCH-UC-008 — Revisar src/usecases/deploy/steps/index.ts**
- [x] **TARCH-UC-009 — Revisar src/usecases/deploy/steps/raw-steps/ensure-bucket.step.ts**
- [x] **TARCH-UC-010 — Revisar src/usecases/deploy/steps/raw-steps/ensure-domain.step.ts**
- [x] **TARCH-UC-011 — Revisar src/usecases/deploy/steps/raw-steps/generate-report.step.ts**
- [x] **TARCH-UC-012 — Revisar src/usecases/deploy/steps/raw-steps/get-domain-config.step.ts**
- [x] **TARCH-UC-013 — Revisar src/usecases/deploy/steps/raw-steps/list-applications.step.ts**
- [x] **TARCH-UC-014 — Revisar src/usecases/deploy/steps/raw-steps/list-buckets.step.ts**
- [x] **TARCH-UC-015 — Revisar src/usecases/deploy/steps/raw-steps/read-config.step.ts**
- [x] **TARCH-UC-016 — Revisar src/usecases/deploy/steps/raw-steps/resolve-paths.step.ts**
- [x] **TARCH-UC-017 — Revisar src/usecases/deploy/steps/raw-steps/select-application.step.ts**
- [x] **TARCH-UC-018 — Revisar src/usecases/deploy/steps/raw-steps/sync-files.step.ts**
- [x] **TARCH-UC-019 — Revisar src/usecases/deploy/steps/raw-steps/validate-local-env.step.ts**
- [x] **TARCH-UC-020 — Revisar src/usecases/deploy/steps/register.ts**
- [x] **TARCH-UC-021 — Revisar src/usecases/deploy/steps/step.base.ts**
- [x] **TARCH-UC-022 — Revisar src/usecases/deploy/steps/step.types.ts**
- [x] **TARCH-UC-023 — Revisar src/usecases/deploy/types.ts**
- [x] **TARCH-UC-024 — Revisar src/usecases/index.ts**
- [x] **TARCH-UC-025 — Revisar src/usecases/shared/index.ts**
- [x] **TARCH-UC-026 — Revisar src/usecases/shared/types.ts**
- [x] **TARCH-UC-027 — Revisar src/usecases/shared/validators/basic.ts**

## Telemetria

- [x] **TARCH-TEL-001 — Revisar src/telemetry/buffer.ts**
- [x] **TARCH-TEL-002 — Revisar src/telemetry/create-event.ts**
- [x] **TARCH-TEL-003 — Revisar src/telemetry/event.ts**
- [x] **TARCH-TEL-004 — Revisar src/telemetry/events.ts**
- [x] **TARCH-TEL-005 — Revisar src/telemetry/events/deploy.ts**
- [x] **TARCH-TEL-006 — Revisar src/telemetry/send.ts**
- [x] **TARCH-TEL-007 — Revisar src/telemetry/startup.ts**
- [x] **TARCH-TEL-008 — Revisar src/telemetry/telemetry.optin.ts**
