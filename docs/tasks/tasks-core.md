# Tasks — Core do Projeto (azion-flow)

Estas tasks criam a fundação do _core_ do projeto, seguindo a arquitetura:  
`context/`, `errors/`, `utils/`, `logger/`.  
Nenhuma task implementa lógica de negócio — apenas a estrutura e placeholders necessários.

---

## ⚡ FASE CORE — Contexto

### - [x] **TCORE-001 — Criar arquivo `src/core/context/index.ts`**

**Descrição:**  
Criar arquivo que exportará o contexto padrão do sistema. Começa vazio.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TSTR-005

---

### - [x] **TCORE-002 — Criar `src/core/context/types.ts`**

**Descrição:**  
Adicionar interfaces mínimas do contexto (ainda vazias).  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-001

---

### - [x] **TCORE-003 — Criar `src/core/context/createContext.ts`**

**Descrição:**  
Criar função vazia `createContext()` que retornará contexto futuro.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-001

---

## ⚡ FASE CORE — Errors

### - [x] **TCORE-004 — Criar diretório `src/core/errors/types/`**

**Descrição:** Criar pasta para tipagens de erros.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Pasta existe  
**Dependência:** TSTR-005

---

### - [x] **TCORE-005 — Criar arquivo `src/core/errors/base-error.ts`**

**Descrição:**  
Criar classe mínima:

```ts
export class BaseError extends Error {}
```

**RFs:** null  
**NRFs:** RNF-003  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-004

---

### - [x] **TCORE-006 — Criar `src/core/errors/error-codes.ts`**

**Descrição:**  
Arquivo contendo enum vazio para códigos de erro.  
**RFs:** null  
**NRFs:** RNF-003  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-004

---

### - [x] **TCORE-007 — Criar `src/core/errors/index.ts`**

**Descrição:**  
Arquivo para exportar módulos de erro.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-005, TCORE-006

---

## ⚡ FASE CORE — Logger

### - [x] **TCORE-008 — Criar `src/core/logger/logger.ts`**

**Descrição:**  
Criar funções vazias:

```ts
export function log() {}
export function logError() {}
export function logDebug() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TSTR-005

---

### - [x] **TCORE-009 — Criar `src/core/logger/types.ts`**

**Descrição:**  
Criar interfaces base para loggers.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-008

---

### - [x] **TCORE-010 — Criar `src/core/logger/adapters/`**

**Descrição:**  
Criar diretório onde ficarão implementações (console, file, future providers).  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Pasta existe  
**Dependência:** TCORE-008

---

### - [x] **TCORE-011 — Criar `src/core/logger/adapters/console-logger.ts`**

**Descrição:**  
Criar arquivo com funções vazias para log via console.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-010

---

## ⚡ FASE CORE — Utils

### - [x] **TCORE-012 — Criar diretório `src/core/utils/fs/`**

**Descrição:** Pasta para utilitários de filesystem.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Pasta existe  
**Dependência:** TSTR-005

---

### - [x] **TCORE-013 — Criar `src/core/utils/fs/path.ts`**

**Descrição:** Funções utilitárias vazias (ex.: join, resolve wrappers).  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-012

---

### - [x] **TCORE-014 — Criar diretório `src/core/utils/text/`**

**Descrição:** Pasta para utilidades de string e formatação.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Pasta existe  
**Dependência:** TSTR-005

---

### - [x] **TCORE-015 — Criar `src/core/utils/text/format.ts`**

**Descrição:** Criar funções vazias:

```ts
export function trimText() {}
export function normalizeText() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-014

---

### - [x] **TCORE-016 — Criar arquivo `src/core/utils/index.ts`**

**Descrição:**  
Arquivo para exportar todos os utilitários centralizados.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCORE-013, TCORE-015

---

## ⚡ FASE CORE — Testes

### - [x] **TCORE-017 — Criar `tests/core/context.test.ts`**

**Descrição:**  
Smoke test:

```ts
import { describe, it, expect } from "vitest";
import * as ctx from "../../src/core/context";

describe("Core Context", () => {
  it("should load without crashing", () => {
    expect(ctx).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:** O teste deve passar  
**Dependência:** TCORE-001

---

### - [x] **TCORE-018 — Criar `tests/core/errors.test.ts`**

**Descrição:**  
Testar imports básicos dos erros.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:** Teste executa sem erro  
**Dependência:** TCORE-007

---

### - [x] **TCORE-019 — Criar `tests/core/logger.test.ts`**

**Descrição:**  
Validar importação do logger sem crash.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:** Teste executa sem erro  
**Dependência:** TCORE-011

---

### - [x] **TCORE-020 — Criar `tests/core/utils.test.ts`**

**Descrição:**  
Smoke test dos utilitários.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:** Teste executa sem erro  
**Dependência:** TCORE-016

---

## 📌 Final da Fase Core

Após concluir esta fase, teremos:

- contexto base
- erros padronizados
- utils organizados
- logger estruturado
- testes de smoke funcionando

E o sistema estará pronto para:

🔥 tasks do domínio  
🔥 tasks dos providers  
🔥 tasks dos use cases  
🔥 tasks dos steps  
🔥 tasks de integrações reais
