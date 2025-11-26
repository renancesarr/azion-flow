# Example — Multi Folder Deploy

Para enviar múltiplas pastas (ex.: `dist` e `assets`), compacte-as previamente ou una em um diretório único antes do deploy:

```bash
mkdir -p build-combined
cp -r dist/* build-combined/
cp -r assets/* build-combined/
azion-flow deploy --build-dir build-combined --bucket my-bucket
```

Dica: use `--json` em CI para coletar resumo do deploy.
