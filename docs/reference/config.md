# Referência de Config — azion-flow

O azion-flow lê um `config.json` opcional na raiz do projeto (consumido por `ReadConfigStep` e `ConfigStorageService`). Campos suportados:

```json
{
  "projectRoot": ".",
  "buildDir": "dist",
  "bucketName": "meu-bucket",
  "domain": "example.com",
  "applicationId": "app-123",
  "token": "AZION_TOKEN_OPCIONAL"
}
```

## Campos

- `projectRoot` (string): raiz do projeto. Default: `process.cwd()`.
- `buildDir` (string): pasta com artefatos a publicar. Default: `dist/` ou `build/` indicado via flag.
- `bucketName` (string): nome do bucket; se ausente, `default-bucket`.
- `domain` (string): domínio desejado; se ausente, steps de domínio são ignorados.
- `applicationId` (string): seleciona app existente; se ausente, `SelectApplicationStep` tenta escolher via provider.
- `token` (string): token da Azion; se não presente, CLI pergunta interativamente.

## Exemplo mínimo

```json
{
  "buildDir": "dist",
  "bucketName": "site-demo",
  "domain": "demo.example.com"
}
```

## Boas práticas

- Não commitar tokens; prefira variáveis de ambiente em CI e injete via `createDeployUseCase({ token })`.
- Mantenha caminhos relativos ao `projectRoot`.
- Valide que `buildDir` existe antes de rodar o deploy.
