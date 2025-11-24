# Primeiros passos — azion-flow

## 1. Preparar projeto

- Gere sua pasta de build (ex.: `npm run build` que produza `dist/`).
- Confirme caminhos:
  - `projectRoot`: raiz do projeto (por padrão `process.cwd()`).
  - `buildDir`: pasta gerada (ex.: `dist/`).

## 2. Criar config mínima (opcional)

Crie `config.json` na raiz:

```json
{
  "bucketName": "meu-bucket",
  "domain": "example.com",
  "buildDir": "dist"
}
```

Campos aceitos: `bucketName`, `domain`, `applicationId`, `buildDir`, `projectRoot`, `token` (quando quiser fixar manualmente).

## 3. Rodar deploy

```bash
azion-flow deploy --build-dir dist --domain example.com
```

- O token será solicitado na primeira execução e validado com a Azion.
- Use `--json` para saída estruturada (CI).

## 4. Interpretar o output

- Resumo mostra bucket, app, domínio e estatísticas de sync.
- `--json` inclui `report` com:
  - `paths`: `projectRoot` e `buildDir`
  - `bucket`: resultado do `ensureBucket`
  - `applications` / `selectedApplication`
  - `domain` e `domainConfig` (se fornecido)
  - `sync`: `uploaded`/`skipped`
  - `generatedAt`: ISO timestamp

## 5. Dicas rápidas

- Sempre verifique se `buildDir` existe antes de executar.
- Para ambientes não interativos, forneça `token` via config ou `providers.httpProvider` ao criar o use case.
- Flags úteis: `--debug`, `--json`, `--silent`, `--no-color`.
