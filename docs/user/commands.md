# Comandos — azion-flow

## `deploy`

Executa o pipeline completo de deploy estático na Azion.

### Uso

```bash
azion-flow deploy [--build-dir <dir>] [--domain <dominio>] [--bucket <nome>] [flags]
```

- `--build-dir`: pasta com artefatos gerados (default: `dist/` ou definida em config).
- `--domain`: domínio desejado.
- `--bucket`: nome do bucket (fallback: `default-bucket`).

### Flags

- `--json`: saída estruturada (para CI/integrações).
- `--debug`: habilita logs adicionais.
- `--silent`: suprime logs de progresso (útil em pipelines).
- `--no-color`: desabilita cores no output.

### Exemplo real

```bash
azion-flow deploy --build-dir dist --domain site.demo --bucket site-demo --json
```

### Token

- Se não existir token carregado, a CLI pergunta e valida.
- Para ambientes não interativos, grave o token em `config.json` ou injete via `createDeployUseCase({ token })`.
