# AI Overview — azion-flow

## Como navegar o repositório

- Código principal em `src/` organizado por `cli`, `usecases`, `domain`, `providers`, `core`.
- Pipelines e tasks documentados em `docs/tasks/`.
- Exemplos em `examples/` para validar comportamentos esperados.

## Entendendo o fluxo

- CLI → `createDeployUseCase` → steps de deploy → serviços → providers Azion.
- Token é obrigatório; se ausente, a CLI pede antes de executar.
- Relatório final disponível em JSON (`--json`) para automação.

## Boas práticas para IAs

- Respeite estrutura por domínio (vertical slices).
- Não injete lógica de negócio em providers.
- Mantenha steps pequenos, puros e fáceis de testar.
- Evite dependências de DOM no Node; use tipagens mínimas como já feito no HTTP client.

## PRs automáticos

- Rodar `npm test`, `npm run lint:md`, `npm run validate-docs`.
- Inclua descrição clara do impacto e arquivos tocados.
- Não reverta mudanças do usuário; aplique patches mínimos e bem localizados.
