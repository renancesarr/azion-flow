# Erros e resolução — azion-flow

## Token ausente ou inválido

- Mensagens:
  - `"AZION_TOKEN ausente: forneça um token ao criar o AzionHttpClient."`
  - `"AZION_TOKEN ausente: informe um token válido."`
  - `"AZION_TOKEN inválido. Verifique e tente novamente."`
- Ação: forneça token válido via prompt, config ou parâmetro da factory (`createDeployUseCase({ token })`).

## Ambiente local inválido

- Mensagem: `"Invalid projectRoot or buildDir"`
- Ação: garanta que `projectRoot` e `buildDir` existem e são strings; passe `--build-dir` correto ou ajuste `config.json`.

## Erros HTTP

- Mensagem genérica: `"${status}: ${statusText}"` lançada pelo `AzionHttpClient` quando `response.ok` é falso.
- Ação: valide credenciais, permissões de API e valores de domínio/bucket.

## Falhas de domínio/bucket/app

- Se providers retornarem `null` ou campos vazios, o relatório refletirá valores `n/a`. Revise `bucketName`, `domain` e `applicationId` fornecidos.

## Diagnóstico

- Use `--debug` para logs mais verbosos.
- Use `--json` para capturar `report` completo e identificar qual step falhou.
