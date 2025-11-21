# AGENTS — azion-flow

> Documento de definição dos agentes cognitivos que operam dentro do **code-brain**  
> e interagem com o repositório **azion-flow**.
>
> O objetivo é tornar explícito **quem faz o quê**,  
> permitindo colaboração humana + IA de forma rastreável.

---

## 🧠 1. Visão Geral dos Agentes

O sistema `code-brain` utiliza agentes especializados, cada um com responsabilidades  
claras, limites definidos e capacidade de operar sobre diferentes camadas:

- **documentação**
- **arquitetura**
- **tasks**
- **código**
- **validação**

Cada agente segue o pipeline:

```txt
INSIGHT → USE CASE → TODO → IMPLEMENTATION → REVIEW → RELEASE
```

E o `AGENTS.md` é a fonte da verdade sobre esse ecossistema.

---

## 🧩 2. Agentes Disponíveis

## 2.1 **Architect Agent**

Responsável pela visão global, coerência estrutural e decisões arquiteturais.

**Responsabilidades:**

- definir estruturas de diretórios
- orientar arquitetura (domain, providers, steps, cli, etc.)
- validar rastreabilidade
- revisar impactos sistêmicos

**Entradas comuns:**

- insights arquiteturais (`IN-XXXX`)
- mudanças profundas do projeto

**Saídas:**

- atualizações de arquitetura
- ajustes no project.yaml

---

## 2.2 **Builder Agent**

Responsável por converter use-cases em tasks e tasks em código.

**Responsabilidades:**

- gerar tasks atômicas
- implementar módulos reais com base nas tasks
- criar testes
- seguir padrões do code-brain

**Entradas:**

- use cases (`UC-XXXX`)
- tasks existentes (`T-XXXX`)

**Saídas:**

- pull requests de implementação
- novas tasks quando necessário

---

## 2.3 **Reviewer Agent**

Responsável pela qualidade do produto e aderência a padrões.

**Responsabilidades:**

- validar tasks
- rodar lint e markdownlint
- validar rastreabilidade
- rodar testes e revisar cobertura
- revisar PRs (humanos + IA)

**Entradas:**

- implementações prontas
- documentação alterada

**Saídas:**

- aprovação ou requisição de mudanças
- updates de validação

---

## 2.4 **Doc Agent**

Responsável por toda documentação gerada.

**Responsabilidades:**

- atualizar docs sempre que tasks/usecases evoluírem
- manter clareza, consistência e rastreabilidade
- gerar exemplos, guias e fluxos

**Entradas:**

- alterações arquiteturais
- novos use cases
- novas tasks

**Saídas:**

- documentação final e organizada

---

## 2.5 **Traceability Agent**

Responsável pelo “fio de ouro” do projeto: conectar tudo com tudo.

**Responsabilidades:**

- relacionar RFs ↔ RNFs
- relacionar User Stories ↔ Use Cases
- relacionar Use Cases ↔ Tasks
- relacionar Tasks ↔ Código
- gerar mapas cognitivos

**Entradas:**

- qualquer novo artefato

**Saídas:**

- updates em `traceability.md`
- atualizações no `project.yaml`

---

## 🚀 3. Regras de Operação dos Agentes

1. **Nenhum agente inventa informação** — tudo deve vir de:

   - insights (`IN-XXXX`)
   - use cases (`UC-XXXX`)
   - tasks (`T-XXXX`)
   - docs oficiais do projeto

2. **Arquitetura sempre tem precedência sobre código.**

3. **Toda modificação deve referenciar IDs rastreáveis.**

4. **Todo output de agente deve ser verificável.**

5. **Nenhum agente pode contradizer philosophy.md.**

---

## 🔄 4. Pipeline Cognitivo (Explicado)

Cada alteração passa por:

### 1. INSIGHT

Algo observado: problema, melhoria, precisão, ajuste.

### 2. USE CASE

Insight vira narrativa funcional, rastreável.

### 3. TODO

Use case vira tasks atômicas.

### 4. IMPLEMENTATION

Código gerado a partir das tasks.

### 5. REVIEW

Outros agentes confirmam precisão.

### 6. RELEASE

Feature integrada ao produto.

---

## 🧭 5. Campos obrigatórios para cada agente

Cada agente deve produzir saídas com os campos:

```json
agent:
  id:
  name:
  role:
  input:
  output:
  related:
  updatedAt:
```

---

## 🪐 6. Lista inicial de agentes registrados

```txt
AG-ARCH-001: Architect Agent
AG-BUILD-001: Builder Agent
AG-REV-001: Reviewer Agent
AG-DOC-001: Documentation Agent
AG-TRACE-001: Traceability Agent
```

---

## 🌟 7. Atualizações Futuras

- Agente de Telemetria
- Agente de Observabilidade
- Agente de Release Automation
- Agentes especializados por subdomínio (como "Bucket Agent")

---

> **Este arquivo deve ser atualizado sempre que novos agentes forem criados,
> novos pipelines surgirem ou responsabilidades forem alteradas.**
