# Exemplo multi-folder — azion-flow

## O que é

Deploy com múltiplas rotas servidas por subpastas (`/`, `/blog/`).

## Passos

1. Entre na pasta:

   ```bash
   cd examples/multi-folder
   ```

2. Ajuste `config.json` com seu bucket/domínio.
3. Rode:

   ```bash
   azion-flow deploy --build-dir dist
   ```

## Estrutura

- `dist/index.html`: rota principal.
- `dist/blog/index.html`: rota de blog.
- `config.json`: parâmetros do deploy.
