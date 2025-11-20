# Traceability Matrix — azion-flow

Rastreabilidade entre User Stories, Requisitos Funcionais e Requisitos Não Funcionais.

Esta matriz conecta os artefatos fundamentais do projeto, permitindo analisar dependências, justificar requisitos, orientar arquitetura e organizar testes.

---

## Legend

- **US** = User Story
- **RF** = Requisito Funcional
- **RNF** = Requisito Não Funcional
- **QA / SR / SEC / PR** = Subcategorias dos RNFs

---

## Matriz RF ↔ RNF ↔ US

| User Story (US)                        | Requisito Funcional (RF)                        | Requisitos Não Funcionais Relacionados (RNF)               | Observações                   |
| -------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------- | ----------------------------- |
| **US-001 — Deploy completo**           | **RF-001 — Execução de deploy completo**        | RNF-001, RNF-002, RNF-003, RNF-007, QA-001, QA-003, QA-004 | Requisito central da CLI      |
| **US-002 — Criar/Reutilizar bucket**   | **RF-002 — Criação automática de bucket**       | RNF-002, RNF-003, SR-001, QA-008                           | Parte inicial do pipeline     |
| **US-003 — Sincronizar arquivos**      | **RF-003 — Sincronização de arquivos**          | RNF-001, RNF-002, QA-007, PR-002                           | Garante integridade do deploy |
| **US-004 — Criar/Atualizar aplicação** | **RF-004 — Criação/atualização da application** | RNF-002, RNF-007, QA-004                                   | Depende de RF-002/003         |
| **US-005 — Configurar domínio**        | **RF-005 — Configuração opcional de domínio**   | RNF-008, QA-002, QA-008                                    | Requisito opcional            |
| **US-006 — Diagnóstico final**         | **RF-006 — Diagnóstico final do deploy**        | RNF-003, RNF-007, QA-001                                   | Etapa de feedback             |
| **US-007 — Config local**              | **RF-007 — Configuração local**                 | RNF-001, SEC-001, QA-003                                   | Base para autenticação        |
| **US-008 — Erros claros**              | **RF-008 — Mensagens de erro claras**           | RNF-003, QA-002, QA-008                                    | Melhora DX                    |

---

## Observações gerais

- Cada RF está corretamente ligado a **pelo menos um RNF**, garantindo qualidade mínima.
- Não há RNFs “órfãos”, todos são utilizados por pelo menos um RF.
- Todos os RFs têm origem clara em uma User Story — nenhuma funcionalidade sem propósito.
- A matriz serve de insumo direto para:
  - arquitetura
  - plano de testes
  - backlog
  - documentação viva
  - evolução do projeto

---

## Próximos passos recomendados

- Criar os **Use Cases (UC)** formais usando essa matriz.
- Gerar visão arquitetural com base nos fluxos RF → RNF.
- Conectar cada RF a um módulo do código conforme o plano de arquitetura.
