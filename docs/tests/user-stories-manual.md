# Manual de Execução — Validação das User Stories

Passos manuais para validar cada história de usuário (US-001 a US-008) com o `azion-flow`. Assuma Node 18+, `npm install` já executado e token da Azion disponível.

## Preparação comum

- Gerar artefatos: `npm run build` do seu site para produzir `dist/` (ou use os exemplos em `examples/`).
- Garantir token: rodar `azion-flow deploy --silent` uma vez para armazenar o token na sessão ou informar `--json` com token no config.
- Ajustar `config.json` conforme o cenário (usar exemplos como base).

## US-001 — Deploy de site estático

1. `cd examples/basic-deploy`
2. `azion-flow deploy --build-dir . --bucket basic-bucket --domain example.com`
3. Verificar resumo: bucket criado/reutilizado, sync com contagem de arquivos, domínio aplicado.
4. Se usar `--json`, confirmar `report.sync.uploaded > 0` e `report.domain.domain` preenchido.

## US-002 — Criação automática de bucket

1. `cd examples/basic-deploy`
2. Escolher bucket inexistente: `azion-flow deploy --build-dir . --bucket bucket-novo --json`
3. Validar no JSON: `report.bucket.name === "bucket-novo"` e ausência de erro.

## US-003 — Upload e sincronização de arquivos

1. `cd examples/basic-deploy`
2. Alterar `index.html` (ex.: adicionar comentário).
3. Rodar `azion-flow deploy --build-dir . --bucket basic-bucket --json`
4. Conferir `report.sync.uploaded` > 0 e `report.sync.skipped` ajustado.

## US-004 — Criação/atualização da aplicação

1. `cd examples/basic-deploy`
2. Rodar `azion-flow deploy --build-dir . --domain example.com --json`
3. Validar que `report.selectedApplication` ou `applicationId` aparece; se já existir, confirmar atualização sem erro.

## US-005 — Configuração opcional de domínio

1. `cd examples/custom-domain`
2. Ajustar `config.json` com domínio real e `applicationId` se houver.
3. `azion-flow deploy --build-dir dist --domain <seu-dominio> --json`
4. Confirmar `report.domain.domain` e, se aplicável, registros retornados ou ID da config.

## US-006 — Diagnóstico final

1. Executar qualquer deploy com `--json`.
2. Verificar campos em `report`: `bucket`, `applications`/`selectedApplication`, `domain`, `sync`, `generatedAt`.
3. Em caso de falha proposital (ex.: remover `buildDir`), confirmar mensagem clara de erro (`Invalid projectRoot or buildDir`).

## US-007 — Configuração local simples

1. Criar `config.json` na raiz do projeto com `bucketName`, `domain`, `buildDir`, opcional `token`.
2. Rodar `azion-flow deploy --json` sem flags adicionais.
3. Confirmar que o token é solicitado se não estiver no config, e que o deploy usa valores do config (`report.config` presente).

## US-008 — Feedback claro em erros

1. Simular erro: rodar `azion-flow deploy --build-dir inexistente` para quebrar a validação local.
2. Verificar mensagem de erro explícita e step identificado.
3. Outra simulação: usar token inválido no config; validar erro “AZION_TOKEN inválido. Verifique e tente novamente.”.
