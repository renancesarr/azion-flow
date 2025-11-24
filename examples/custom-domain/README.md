# Exemplo de domínio customizado — azion-flow

## O que é

Fluxo para publicar e apontar para um domínio customizado existente.

## Passos

1. Entre na pasta:

   ```bash
   cd examples/custom-domain
   ```

2. Edite `config.json`:
   - `bucketName`: bucket alvo.
   - `domain`: domínio completo (ex.: `www.seu-dominio.com`).
   - `applicationId`: ID da aplicação já criada (se tiver).
3. Rode:

   ```bash
   azion-flow deploy --build-dir dist --domain www.seu-dominio.com
   ```

## Estrutura

- `dist/index.html`: página a ser publicada.
- `config.json`: parâmetros do deploy com domínio customizado.
