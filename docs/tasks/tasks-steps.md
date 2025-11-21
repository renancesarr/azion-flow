# Tasks — Steps do Deploy (azion-flow)

Os **Steps** são os blocos mínimos de execução dos Use Cases.  
Cada Step faz **uma única coisa**.  
Aqui criamos APENAS a estrutura, classes vazias, contratos e testes de fumaça.

---

## ⚡ FASE STEPS — Estrutura Base

### - [ ] **TSTEP-001 — Criar diretório `src/usecases/deploy/steps/raw-steps/`**

**Descrição:**  
Diretório onde ficarão steps unitários, cada um responsável por uma ação única.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Pasta existe  
**Dependência:** TUC-002

---

### - [ ] **TSTEP-002 — Criar arquivo `src/usecases/deploy/steps/step.base.ts`**

**Descrição:**  
Criar classe abstrata base para steps:

```ts
export abstract class DeployStepBase {
  abstract execute(context: any): Promise<void>;
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TUC-003

---

Cada step abaixo é **somente um arquivo vazio**, com classe preparada para implementação futura.

---

## 🎯 Grupo 1 — Preparação Local

### - [ ] **TSTEP-003 — Step: Validar ambiente local**

**Arquivo:** `validate-local-env.step.ts`  
**Descrição:**  
Classe vazia:

```ts
export class ValidateLocalEnvStep extends DeployStepBase {
  async execute(context) {}
}
```

**Dependência:** TSTEP-002

---

### - [ ] **TSTEP-004 — Step: Ler config local**

**Arquivo:** `read-config.step.ts`  
**Dependência:** TSTEP-002

---

### - [ ] **TSTEP-005 — Step: Resolver paths locais**

**Arquivo:** `resolve-paths.step.ts`  
**Dependência:** TSTEP-002

---

## 🎯 Grupo 2 — Integração com Azion: Storage

### - [ ] **TSTEP-006 — Step: Obter lista de buckets**

**Arquivo:** `list-buckets.step.ts`  
**Dependência:** TSTEP-002

---

### - [ ] **TSTEP-007 — Step: Garantir bucket alvo**

**Arquivo:** `ensure-bucket.step.ts`  
**Dependência:** TSTEP-006

---

### - [ ] **TSTEP-008 — Step: Sincronizar arquivos**

**Arquivo:** `sync-files.step.ts`  
**Dependência:** TSTEP-007

---

## 🎯 Grupo 3 — Integração com Azion: Application

### - [ ] **TSTEP-009 — Step: Listar aplicações**

**Arquivo:** `list-applications.step.ts`  
**Dependência:** TSTEP-002

---

### - [ ] **TSTEP-010 — Step: Selecionar aplicação alvo**

**Arquivo:** `select-application.step.ts`  
**Dependência:** TSTEP-009

---

## 🎯 Grupo 4 — Integração com Azion: Domain Config

### - [ ] **TSTEP-011 — Step: Obter configurações de domínio**

**Arquivo:** `get-domain-config.step.ts`  
**Dependência:** TSTEP-002

---

### - [ ] **TSTEP-012 — Step: Garantir domínio configurado**

**Arquivo:** `ensure-domain.step.ts`  
**Dependência:** TSTEP-011

---

## 🎯 Grupo 5 — Finalização

### - [ ] **TSTEP-013 — Step: Gerar relatório final de deploy**

**Arquivo:** `generate-report.step.ts`  
**Dependência:** Todos anteriores

---

## ⚡ FASE STEPS — Registro e Exportação

### - [ ] **TSTEP-014 — Criar arquivo `src/usecases/deploy/steps/register.ts`**

**Descrição:**  
Arquivo onde steps serão futuramente registrados em ordem.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTEP-013

---

### - [ ] **TSTEP-015 — Atualizar `src/usecases/deploy/steps/index.ts`**

**Descrição:**  
Exportar todos steps criados.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Exporta corretamente  
**Dependência:** TSTEP-014

---

## 🧪 FASE STEPS — Testes

### - [ ] **TSTEP-016 — Criar `tests/usecases/steps/smoke.test.ts`**

**Descrição:**  
Smoke global:

```ts
import { describe, it, expect } from "vitest";
import * as steps from "../../../src/usecases/deploy/steps";

describe("Deploy Steps", () => {
  it("should load without crashing", () => {
    expect(steps).toBeDefined();
  });
});
```

**Dependência:** TSTEP-015

---

## 🎯 FINAL

Após essa fase teremos:

- estrutura completa dos Steps
- todos steps de deploy criados
- base abstrata
- exportação central
- smoke tests para integridade

E o próximo passo natural será:

🔥 **Tasks de Integração real com Azion API**  
🔥 **Tasks dos mapeamentos HTTP**  
🔥 **Tasks dos adapters**  
🔥 **Tasks dos flows completos**
