# Example — Basic Deploy

Passos:

1) Gere seus arquivos estáticos na pasta `dist/`.
2) Execute:

```bash
azion-flow deploy --build-dir dist --bucket my-bucket
```

Flags úteis:
- `--domain example.com` para já associar domínio.
- `--json` para saída automatizada no CI.
