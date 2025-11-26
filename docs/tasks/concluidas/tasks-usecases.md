# Tasks — Use Cases (azion-flow)

Os **Use Cases** são a camada que orquestra o fluxo.  
Eles usam:

- services do domínio
- providers
- steps
- contexto

Aqui criamos SOMENTE a estrutura, contratos e testes de fumaça.  
Sem lógica real ainda.

---

## ⚡ FASE USE CASES — Deploy

## Diretório base

### - [x] **TUC-001 — Criar arquivo `src/usecases/deploy/deploy.usecase.ts`**

**Descrição:**  
Criar classe vazia representando o caso de uso de deploy:

```ts
export class DeployUseCase {
  async execute() {}
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-011

---

## Steps do Deploy (somente referências)

### - [x] **TUC-002 — Criar diretório `src/usecases/deploy/steps/`**

**Descrição:**  
Pasta já deveria existir; caso não, criar.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Pasta existe  
**Dependência:** TSTR-012

---

### - [x] **TUC-003 — Criar arquivo `src/usecases/deploy/steps/step.types.ts`**

**Descrição:**  
Definir interface base de step:

```ts
export interface DeployStep {
  execute(context: any): Promise<void>;
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-002

---

### - [x] **TUC-004 — Criar arquivo `src/usecases/deploy/steps/index.ts`**

**Descrição:**  
Exportar steps (ainda vazios).  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-003

---

## Tipos e Contexto do Deploy

### - [x] **TUC-005 — Criar arquivo `src/usecases/deploy/types.ts`**

**Descrição:**  
Definir interfaces básicas de contexto do deploy:

```ts
export interface DeployContext {}
export interface DeployResult {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-001

---

### - [x] **TUC-006 — Criar arquivo `src/usecases/deploy/deploy.factory.ts`**

**Descrição:**  
Criar função vazia para montar a cadeia de steps.

```ts
export function createDeployUseCase() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-001, TUC-003

---

## ⚙️ FASE USE CASES — Config

## Base

### - [x] **TUC-007 — Criar arquivo `src/usecases/config/config.usecase.ts`**

**Descrição:**  
Classe base para gerenciar config local (token, defaults).

```ts
export class ConfigUseCase {
  async execute() {}
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-011

---

### - [x] **TUC-008 — Criar arquivo `src/usecases/config/types.ts`**

**Descrição:**  
Interfaces mínimas.

```ts
export interface ConfigContext {}
export interface ConfigResult {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-007

---

## 📁 FASE USE CASES — Shared

### - [x] **TUC-009 — Criar diretório `src/usecases/shared/validators/`**

**Descrição:**  
Criar pasta para validadores usados em múltiplos usecases.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Pasta existe  
**Dependência:** TSTR-011

---

### - [x] **TUC-010 — Criar arquivo `src/usecases/shared/validators/basic.ts`**

**Descrição:**  
Arquivo contendo funções de validação vazias:

```ts
export function validate() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-009

---

### - [x] **TUC-011 — Criar arquivo `src/usecases/shared/types.ts`**

**Descrição:**  
Interfaces compartilhadas básicas.

```ts
export interface UseCaseContext {}
export interface UseCaseResult {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-011

---

## 📦 FASE USE CASES — Indexação

### - [x] **TUC-012 — Criar arquivo `src/usecases/index.ts`**

**Descrição:**  
Exportar todos os usecases.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** Todos anteriores

---

## 🧪 FASE USE CASES — Testes

### - [x] **TUC-013 — Criar `tests/usecases/deploy.test.ts`**

**Descrição:**  
Smoke test:

```ts
import { describe, it, expect } from "vitest";
import { DeployUseCase } from "../../src/usecases/deploy/deploy.usecase";

describe("Deploy Use Case", () => {
  it("loads without crashing", () => {
    const uc = new DeployUseCase();
    expect(uc).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve passar  
**Dependência:** TUC-001

---

### - [x] **TUC-014 — Criar `tests/usecases/config.test.ts`**

**Descrição:**  
Smoke test para ConfigUseCase.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve passar  
**Dependência:** TUC-007

---

### - [x] **TUC-015 — Criar `tests/usecases/shared.test.ts`**

**Descrição:**  
Smoke test global:

```ts
import * as shared from "../../src/usecases/shared";
import { describe, it, expect } from "vitest";

describe("Shared UseCase Types", () => {
  it("loads without crashing", () => {
    expect(shared).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve passar  
**Dependência:** TUC-011

---

## 🎯 Final da Fase Use Cases

Após essa fase, teremos:

- UseCases base criados
- Tipos de contexto e resultado
- Estrutura de steps do deploy
- Shared validators
- Smoke tests garantindo integridade

Pronto para:

🔥 **Tasks dos Steps**  
🔥 Implementação real  
🔥 Integração com providers  
🔥 Orquestração completa
