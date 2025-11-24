# Services — Domínio

## Papel

Traduzem regras de negócio em operações sobre providers. Não conhecem CLI nem detalhes de HTTP.

## Serviços atuais

- `BucketService`: lista e garante bucket para deploy.
- `FileSyncService`: sincroniza arquivos do `buildDir` para o bucket.
- `ApplicationService`: lista e seleciona aplicação (placeholder para lógica futura).
- `DomainConfigService`: lê config de domínio e garante criação se ausente.
- `ConfigStorageService`: carrega config persistida (porta para futura implementação).

## Contrato de uso

- Recebem providers via factories (`createDeployUseCase`, `createDomainServices`).
- Operam sobre objetos de domínio simples (`bucket`, `domain`, `sync stats`).
- Devem permanecer puros exceto por chamadas às portas (providers).
