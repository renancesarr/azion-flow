# Exemplo básico — azion-flow

## O que é

Deploy mínimo de um `index.html` diretamente na raiz do bucket.

## Passos

1. Entre na pasta:

   ```bash
   cd examples/basic-deploy
   ```

2. Ajuste `config.json` com seu bucket/domínio.
3. Rode:

   ```bash
   azion-flow deploy --build-dir .
   ```

## Estrutura

- `index.html`: página simples para publicação.
- `config.json`: parâmetros do deploy (bucket/domínio).
