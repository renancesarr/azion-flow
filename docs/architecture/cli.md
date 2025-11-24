# CLI — UX e Estrutura

## Entrada

- `src/cli/index.ts`: imprime banner, chama `bootstrap`, roteia comandos.
- `src/cli/router.ts`: despacha para `commands/`.
- `src/cli/commands/deploy.ts`: comando disponível hoje.

## UX

- Prompt de token automático se não houver token carregado.
- Flags: `--json`, `--debug`, `--silent`, `--no-color`.
- Saída enxuta por padrão, detalhada em JSON quando solicitado.

## Logs e output

- `createCliStepLogger` controla verbosidade; respeita `--silent`.
- Resumo textual com tabela simples; JSON inclui `report` completo.

## Estrutura de comandos

- Cada comando vive em `src/cli/commands/<nome>.ts`.
- Utilidades compartilhadas em `src/cli/utils/` (token prompt, tabela, logger).

## Decisões

- CLI fina: apenas coleta inputs e delega a use cases.
- Compatível com CI: modo `--json` e `--silent` evitam ruído.
