# Prompts úteis para IAs

## Extensões seguras

- **Adicionar step ao deploy**: “Adicione um novo step em `src/usecases/deploy/steps/raw-steps/` que faça X, registre no pipeline em `deploy.orchestrator.ts` e cubra com teste simples.”
- **Novo provider**: “Implemente provider para Y em `src/providers/`, mantendo o contrato dos services existentes; injete via factory sem quebrar API.”
- **Ajuste de config**: “Atualize `config.json` de exemplo e docs para refletir novo campo Z; mantenha `validate-docs` passando.”

## Correções

- “Encontre e corrija regressões nos steps de deploy; rode `npm test` e descreva os arquivos tocados.”
- “Se token estiver opcional, torne obrigatório e adapte factories/CLI; atualize testes.”

## Geração de serviços/steps

- “Crie service em `src/domain/<dominio>/` com operações <A,B>; injete-o na factory correspondente e exponha via use case.”
- “Adicione step que grava no `context.report` o resultado de <operação>; mantenha side-effects isolados.”

## Boas práticas ao responder

- Liste arquivos alterados e motivo.
- Evite alterar arquivos fora do escopo.
- Sempre sugerir como validar (`npm test`, `npm run lint:md`, `npm run validate-docs`).
