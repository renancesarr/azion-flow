# IA Change Template — Code-Brain

> Salve como `code-brain/developer/logs-ai-code/<timestamp>-ia-code.md`.
> Cite sempre os IDs envolvidos (`IN-XXXX`, `UC-XXXX`, `T-XXXX`) e os validadores executados.

## 1. Contexto consumido

- context-index.yaml → AGENTS.md → project-guide.md → docs/architecture.md → docs/stack.md → docs/tasks/tasks-deploy-flow-real.md → src/usecases/deploy/{deploy.orchestrator.ts,deploy.usecase.ts,deploy.factory.ts,pipeline.ts} → src/cli/router.ts → src/cli/commands/deploy.ts → tests/usecases/pipeline-order.test.ts.

## 2. Objetivo da alteração

- Executar tasks TDEP-REAL-001..011 (orchestrator real, pipeline real, contexto, logs/timings, CLI deploy e flags) e marcar status no tasks.

## 3. Decisões e justificativas

- Implementação mínima respeitando arquitetura: loop sequencial, error boundary, timings, debug log, merge de contexto, retorno do use case.
- CLI deploy adicionada com flags `--json`, `--debug`, `--no-color`; router atualizado para despachar.
- Teste de ordem do pipeline criado; integração real (TDEP-REAL-012/013/014) deixada pendente por falta de mocks/providers reais.

## 4. Implementação

- Alterados: `src/usecases/deploy/deploy.orchestrator.ts` (contrutor real, run com try/catch, timings, log, merge), `deploy.usecase.ts` (retorno success/report), `deploy.factory.ts` (instancia orchestrator+usecase), `pipeline.ts` (ordem real), `src/cli/router.ts` (dispatch), `src/cli/commands/deploy.ts` (comando real com flags).
- Novo: `tests/usecases/pipeline-order.test.ts`.
- Atualizado: `docs/tasks/tasks-deploy-flow-real.md` (TDEP-REAL-001..011 marcados).

## 5. Revisão humana

- Confirmar se o contexto/report devem ter estrutura mais rígida (tipagem futura).
- CLI deploy ainda sem sumarização/UX (TUX-009) e sem integração com steps reais; aceitar por enquanto.

## 6. Follow-ups

- Criar testes integrados com mocks (TDEP-REAL-012/013/014).
- Integrar loaders/labels ao orchestrator (TUX-007) e sumarização (TUX-009).
- Rodar `npm test` após instalar dependências.

## 7. Next Steps

- Implementar steps/services reais (TSTEPREAL/TSERVREAL) e completar integração de deploy com providers.
