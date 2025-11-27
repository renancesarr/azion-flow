# Backlog — azion-flow

## Core

- Implementar tratamento de erros custom no core (substituir pasta removida `src/core/errors` por uma abordagem consistente de error handling).
- Implementar logger consolidado no core (substituir pasta removida `src/core/logger` por uma solução real de logging/observabilidade).
- Revisar Providers → migrar para domínios equivalentes ou ajustar naming conforme Azion v4 (Applications, Auth, DNS, DigitalCertificates, Firewalls, Functions, Storage, WAFs).

## Domains — Applications

- Completar DTOs e validações; alinhar provider e service com schemas reais da API v4.

## Domains — Storage

- Cobrir credenciais/buckets/files com endpoints completos; integrar credenciais ao fluxo de deploy quando aplicável.

## Domains — Auth

- Criar services/providers para autenticação (login/token refresh) alinhados à API v4.

## Domains — DNS

- Criar services/providers para zones/records conforme API v4; avaliar uso no fluxo de deploy.

## Domains — DigitalCertificates

- Criar services/providers para certificados (emitir/listar/anexar) via API v4.

## Domains — Firewalls

- Criar services/providers para regras/policies de firewall (API v4).

## Domains — Functions

- Criar services/providers para funções serverless (deploy/list) via API v4.

## Domains — WAFs

- Criar services/providers para WAF rules/exceptions (API v4).
