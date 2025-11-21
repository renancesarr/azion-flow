# PROJECT GUIDE — Azion Flow

> Documento-guia cognitivo do projeto, projetado para orientar humanos e IAs  
> na leitura, evolução e operação do repositório.  
> Este guia referencia os documentos do diretório `docs/` e o manifesto `project.yaml`.

---

## 1. Sobre este Documento

O objetivo deste **Project Guide** é servir como o _mapa cognitivo principal_ do projeto **azion-flow**.

Ele explica:

- como o projeto deve ser lido
- como navegar os artefatos
- como conectar Philosophy → RF → RNF → User Stories → Use Cases → Tasks → Código
- como operar o pipeline cognitivo INSIGHT → USE CASE → TODO → IMPLEMENTATION
- como manter coerência entre humanos e IAs

Este documento não contém conteúdo detalhado — ele **referencia** os arquivos oficiais.

---

## 2. Mapa Cognitivo do Projeto

O projeto segue uma estrutura baseada em rastreabilidade total.

Cada camada possui um arquivo próprio:

| Camada                    | Arquivo                               |
| ------------------------- | ------------------------------------- |
| Filosofia                 | `docs/philosophy.md`                  |
| User Stories              | `docs/user-stories.md`                |
| Requisitos Funcionais     | `docs/requirements-functional.md`     |
| Requisitos Não-Funcionais | `docs/requirements-non-functional.md` |
| Use Cases                 | `docs/use-cases.md`                   |
| Matriz de Rastreabilidade | `docs/traceability-matrix.md`         |
| Arquitetura               | `docs/architecture.md`                |
| Stack                     | `docs/stack.md`                       |

Toda IA que operar aqui deve **ler primeiro** estes documentos na ordem acima.

---

## 3. Filosofia (referência)

A visão, o problema, as dores e o propósito do projeto estão em:

📄 `docs/philosophy.md`

Este arquivo responde:

- por que o projeto existe
- quais dores humanas ele resolve
- qual a visão estratégica

---

## 4. Artefatos Principais do Projeto

## 4.1 User Stories

📄 `docs/user-stories.md`  
Histórias centradas no usuário, descrevendo necessidades reais.

## 4.2 Requisitos Funcionais

📄 `docs/requirements-functional.md`  
Especificações testáveis do que o sistema **deve** fazer.

## 4.3 Requisitos Não Funcionais

📄 `docs/requirements-non-functional.md`  
Regras de qualidade, segurança, constraints técnicas e operacionais.

## 4.4 Use Cases

📄 `docs/use-cases.md`  
Cadeias funcionais completas, conectadas aos RF, RNF e User Stories.

---

## 5. Matriz de Rastreabilidade

📄 `docs/traceability-matrix.md`

A matriz conecta:

- RF → RNF
- User Story → Use Case
- Use Case → Tasks
- Tasks → Código

Este é o documento mais importante para IAs.

---

## 6. Arquitetura (Resumo + Referência)

📄 `docs/architecture.md`

Este documento descreve:

- camadas core (domain, services)
- providers (Azion API)
- steps (pipeline de deploy)
- orchestrator
- fluxo end-to-end do deploy

IAs devem usar este documento antes de gerar qualquer modificação estrutural.

---

## 7. Pipeline Cognitivo

O azion-flow segue o mesmo fluxo definido pelo **code-brain**:

```txt
INSIGHT → USE CASE → TODO → IMPLEMENTATION → REVIEW → RELEASE
```

### 7.1 INSIGHT

Observação, problema percebido, melhoria.

### 7.2 USE CASE

Insight transformado em narrativa funcional com ID `UC-XXXX`.

### 7.3 TODO

Use case vira tasks atômicas (TXXX) em `docs/tasks/`.

### 7.4 IMPLEMENTATION

Tasks viram código real.

### 7.5 REVIEW

Validação humana + IA.

### 7.6 RELEASE

Feature integrada e documentada.

---

## 8. MVP Roadmap

O roadmap evolui o sistema de maneira incremental.

Definição completa está em:  
📄 `project.yaml`

Resumo:

### **MVP-1**

- Deploy funcional de site estático
- Bucket → Upload → Relatório básico
- Use cases incluídos: `UC-001`, `UC-002`

### **MVP-2**

- Detecção de aplicação
- Configuração de domínio
- Use case incluído: `UC-003`

---

## 9. Governança do Projeto

### Regras Gerais

- Tudo deve ser rastreável.
- Nada é modificado sem referência a IDs (US, RF, RNF, UC, T).
- IAs devem sempre ler:
  1. `project.yaml`
  2. `docs/architecture.md`
  3. `docs/traceability-matrix.md`

### Arquivos controlados por IA

- `docs/tasks/*.md`
- `docs/ai/*`

### Arquivos controlados por humanos

- `philosophy.md`
- decisões estratégicas
- conteúdo sensível

---

## 10. Operação por IAs

IAs devem seguir esta ordem:

1. Ler `project.yaml`
2. Ler `AGENTS.md`
3. Ler `project-guide.md`
4. Ler o documento solicitado
5. Localizar IDs rastreáveis
6. Propor mudanças com base no pipeline cognitivo
7. Gerar patches mínimos
8. Atualizar rastreabilidade quando cabível

---

## 11. Conclusão

Este Project Guide é o **manual de operação cognitiva do azion-flow**.  
Qualquer mudança arquitetural, de requisitos, de tasks ou de fluxo deve ser:

- rastreável
- documentada
- coerente com a filosofia
- refletida no `project.yaml`

Atualize este documento sempre que o projeto evoluir.
