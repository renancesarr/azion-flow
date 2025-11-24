# Providers — Azion e Infra

## Papel dos providers

Executam IO externo (HTTP, filesystem, config). Não contêm lógica de negócio; apenas chamadas à Azion ou ao sistema local.

## AzionHttpClient

- Wrapper mínimo sobre `fetch`.
- Requer `token` obrigatório no construtor.
- Adiciona `Authorization: Token <token>` e envia JSON.
- Lança `AzionHttpError` se resposta não for `ok`.

## Providers específicos

- `AzionStorageProvider`: lista/garante buckets (`/workspace/storage/buckets`).
- `AzionApplicationProvider`: lista aplicações (`/workspace/applications`).
- `AzionDomainProvider`: lê/garante domínios (`/domains`).

Todos recebem `{ token, http? }` e reutilizam o `AzionHttpClient` compartilhado.

## Outros providers

- `NodeFileSystemProvider`: abstração de filesystem local.
- `FileConfigProvider`: ponto de extensão para ler `config.json` (implementação simples placeholder).

## Decisões técnicas

- Token obrigatório para evitar estados parciais.
- Providers são passados via factories, permitindo injeção em testes.
- Headers e parsing de resposta são centralizados no HTTP client para manter chamadas concisas.
