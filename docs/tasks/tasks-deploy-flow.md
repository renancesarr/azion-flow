# Tasks — Fluxo Final de Deploy (azion-flow)

Agora que temos:

- UseCases
- Steps
- Providers
- Domínio
- Integração base com Azion

…chegou a hora de montar o **fluxo final do deploy**.  
Aqui não implementamos lógica complexa ainda — apenas **estrutura funcional**, orquestração e testes de integração do fluxo.

As tasks abaixo são extremamente atômicas.

---

## ⚡ FASE 1 — Definir Pipeline Oficial do Deploy

### - [x] **TDEP-001 — Criar arquivo `src/usecases/deploy/pipeline.ts`**

**Descrição:**  
Criar arquivo que exporta a SEQUÊNCIA oficial dos steps, exemplo vazio:

```ts
import { DeployStepBase } from "./steps/step.base";

export const DEPLOY_PIPELINE: (new () => DeployStepBase)[] = [];
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TUC-006, TSTEP-015

---

### - [x] **TDEP-002 — Preencher pipeline com steps (sem lógica interna)**

**Descrição:**  
Adicionar no array a lista dos steps na ordem correta.  
Ainda sem parâmetros e sem lógica de execução.  
**Dependência:** TDEP-001

---

## ⚡ FASE 2 — Orquestrador do Deploy

### - [x] **TDEP-003 — Criar arquivo `src/usecases/deploy/deploy.orchestrator.ts`**

**Descrição:**  
Criar classe vazia responsável por:

- receber providers
- receber services
- receber steps
- possuir método `run()` vazio

```ts
export class DeployOrchestrator {
  constructor(steps: any[], services: any, providers: any) {}
  async run() {}
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TUC-001

---

### - [x] **TDEP-004 — Conectar factory → orchestrator**

**Arquivo:** `deploy.factory.ts`  
**Descrição:**  
Adicionar instância do orchestrator (ainda sem lógica).  
**Dependência:** TDEP-003, TAZ-018

---

## ⚡ FASE 3 — Execução Sequencial dos Steps

> Aqui finalmente damos vida ao fluxo do deploy, mas ainda sem lógica específica por step.

### - [x] **TDEP-005 — Implementar esqueleto de execução no orchestrator**

**Descrição:**  
Adicionar o loop de steps (vazio):

```ts
for (const Step of this.steps) {
  const stepInstance = new Step();
  await stepInstance.execute(context);
}
```

Sem erros, sem logs, sem lógica interna.  
**RFs:** RF-FLOW-EXECUTION (futuro)  
**NRFs:** RNF-001  
**Dependência:** TDEP-003

---

### - [x] **TDEP-006 — Criar estrutura inicial do `context` de deploy**

**Arquivo:** `src/usecases/deploy/context.ts`  
**Descrição:**  
Criar estrutura base do contexto:

```ts
export function createDeployContext(): any {
  return {};
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TUC-005

---

### - [x] **TDEP-007 — Ligar contexto ao orchestrator**

**Descrição:**  
Adaptar orchestrator para receber `createDeployContext()`.  
**Dependência:** TDEP-006, TDEP-005

---

## ⚡ FASE 4 — Validação e Encapsulamento de Dependências

### - [x] **TDEP-008 — Injetar Providers diretamente no DeployUseCase**

**Arquivo:** `deploy.usecase.ts`  
**Descrição:**  
Adicionar construtor com:

- providers
- services
- pipeline
- orchestrator  
  Sem lógica de fluxo.  
  **Dependência:** TDEP-004

---

### - [x] **TDEP-009 — Validar instância do pipeline**

**Arquivo:** `deploy.factory.ts`  
**Descrição:**  
Adicionar apenas verificação simples: array existe.  
**Dependência:** TDEP-002

---

## ⚡ FASE 5 — Conectar CLI → Deploy

### - [x] **TDEP-010 — Criar comando CLI `deploy` (vazio)**

**Arquivo:** `src/cli/commands/deploy.ts`  
**Descrição:**  
Criar função:

```ts
export async function deployCommand() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TCLI-005

---

### - [x] **TDEP-011 — Atualizar router da CLI para incluir comando deploy**

**Arquivo:** `src/cli/router.ts`  
**Descrição:**  
Adicionar case vazio:

```ts
if (args[0] === "deploy") return deployCommand();
```

**Dependência:** TDEP-010

---

## ⚡ FASE 6 — Testes de Integração (Flow → Steps)

### - [x] **TDEP-012 — Criar teste `tests/integration/deploy-flow.test.ts`**

**Descrição:**  
Teste de esqueleto:

```ts
import { describe, it, expect } from "vitest";
import { createDeployUseCase } from "../../src/usecases/deploy/deploy.factory";

describe("Deploy Flow", () => {
  it("should build deploy usecase without crashing", () => {
    const uc = createDeployUseCase();
    expect(uc).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Dependência:** TAZ-018, TDEP-004

---

### - [x] **TDEP-013 — Criar teste `tests/integration/deploy-orchestrator.test.ts`**

**Descrição:**  
Validar que o orchestrator consegue rodar sem steps quebrarem:

```ts
const orchestrator = new DeployOrchestrator([], {}, {});
await orchestrator.run();
```

**Dependência:** TDEP-005

---

## ⚡ FASE 7 — Finalização do Fluxo

### - [x] **TDEP-014 — Criar arquivo `src/usecases/deploy/result.ts`**

**Descrição:**  
Criar interface vazia de resultado:

```ts
export interface DeployFinalResult {}
```

**Dependência:** TUC-005

---

### - [x] **TDEP-015 — Retornar resultado vazio no DeployUseCase**

**Descrição:**  
Adicionar return `{}` no método execute().  
Sem lógica.  
**Dependência:** TDEP-008, TDEP-014

---

## 🎯 FINAL

Com esta fase concluída, o azion-flow terá:

- pipeline definido
- orchestrator funcional
- sequência de steps conectada
- deploy usecase montado
- CLI conectada ao flow
- testes garantindo a integridade do fluxo
- arquitetura pronta para receber as implementações reais

Próximas fases:

🔥 Tasks de Implementação REAL dos Steps  
🔥 Tasks de Erros e Logs do Flow  
🔥 Tasks de UX (loading steps, mensagens, resumo final)  
🔥 Tasks de Releases
