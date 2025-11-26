# Tasks — Providers (azion-flow)

Os **providers** são a camada que conversa com o mundo externo:  
HTTP (Azion), Filesystem e Config.  
Nenhuma lógica de negócio — apenas adaptação e contratos.  
As tasks abaixo seguem atomicidade máxima.

---

## 🌐 FASE PROVIDERS — HTTP Base (Azion HTTP Client)

### - [x] **TPROV-001 — Criar diretório `src/providers/azion/http/`**

**Descrição:**  
Criar pasta exclusiva para o cliente HTTP da Azion.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Pasta existe  
**Dependência:** TSTR-009

---

### - [x] **TPROV-002 — Criar arquivo `src/providers/azion/http/http-client.ts`**

**Descrição:**  
Criar classe vazia:

```ts
export class AzionHttpClient {}
```

Será o cliente HTTP básico da Azion.  
**RFs:** null  
**NRFs:** RNF-004 (Confiabilidade)  
**Testes:** Arquivo existe  
**Dependência:** TPROV-001

---

### - [x] **TPROV-003 — Criar arquivo `src/providers/azion/http/types.ts`**

**Descrição:**  
Adicionar interfaces vazias para request/response.

```ts
export interface HttpRequest {}
export interface HttpResponse {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TPROV-001

---

### - [x] **TPROV-004 — Criar `src/providers/azion/http/index.ts`**

**Descrição:**  
Exportar componentes HTTP do provider.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TPROV-002, TPROV-003

---

---

## 📦 FASE PROVIDERS — Azion Storage

### - [x] **TPROV-005 — Criar arquivo `src/providers/azion/azion.storage.ts`**

**Descrição:**  
Criar classe vazia que futuramente enviará operações de Bucket.

```ts
export class AzionStorageProvider {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-009

---

## 📦 FASE PROVIDERS — Azion Application

### - [x] **TPROV-006 — Criar arquivo `src/providers/azion/azion.application.ts`**

**Descrição:**  
Classe vazia representando provedor de aplicações.

```ts
export class AzionApplicationProvider {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-009

---

## 🌐 FASE PROVIDERS — Azion Domain

### - [x] **TPROV-007 — Criar arquivo `src/providers/azion/azion.domain.ts`**

**Descrição:**  
Classe vazia representando provedor de configurações de domínio.

```ts
export class AzionDomainProvider {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-009

---

## 📁 FASE PROVIDERS — Filesystem (FS)

### - [x] **TPROV-008 — Criar arquivo `src/providers/filesystem/nodefs.ts`**

**Descrição:**  
Criar provider básico de FS com estrutura vazia.

```ts
export class NodeFileSystemProvider {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:**

- Arquivo existe  
  **Dependência:** TSTR-009

---

## ⚙️ FASE PROVIDERS — Config (Persistência de Config Local)

### - [x] **TPROV-009 — Criar arquivo `src/providers/config/file-config.ts`**

**Descrição:**  
Criar provider de configuração baseado em arquivo local.

```ts
export class FileConfigProvider {}
```

**RFs:** null  
**NRFs:** RNF-001, RNF-003  
**Testes:** Arquivo existe  
**Dependência:** TSTR-009

---

## 🧱 FASE PROVIDERS — Tipos Globais de Providers

### - [x] **TPROV-010 — Criar arquivo `src/providers/types.ts`**

**Descrição:**  
Criar interfaces mínimas para padronizar providers.

```ts
export interface Provider {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-009

---

### - [x] **TPROV-011 — Criar `src/providers/index.ts`**

**Descrição:**  
Arquivo exportador central.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** Todas anteriores

---

## 🧪 FASE PROVIDERS — Testes

### - [x] **TPROV-012 — Criar `tests/providers/http.test.ts`**

**Descrição:**  
Smoke test básico:

```ts
import { describe, it, expect } from "vitest";
import * as http from "../../src/providers/azion/http";

describe("Azion HTTP Provider", () => {
  it("loads without crashing", () => {
    expect(http).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-004

---

### - [x] **TPROV-013 — Criar `tests/providers/storage.test.ts`**

**Descrição:**  
Smoke test para storage provider.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-005

---

### - [x] **TPROV-014 — Criar `tests/providers/application.test.ts`**

**Descrição:**  
Smoke test para application provider.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-006

---

### - [x] **TPROV-015 — Criar `tests/providers/domain.test.ts`**

**Descrição:**  
Smoke test para domain provider.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-007

---

### - [x] **TPROV-016 — Criar `tests/providers/filesystem.test.ts`**

**Descrição:**  
Smoke test para FS provider.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-008

---

### - [x] **TPROV-017 — Criar `tests/providers/config.test.ts`**

**Descrição:**  
Smoke test para config provider.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Deve rodar  
**Dependência:** TPROV-009

---

## 🎯 Final da Fase Providers

Após essas tasks, teremos:

- Providers completos (estrutura)
- Exportação centralizada
- Tipos preparados
- Testes iniciais
- Azion + FS + Config prontos para integração com casos de uso

A próxima fase natural é:  
🔥 **tasks dos UseCases**  
Depois:  
🔥 **tasks dos Steps**  
E aí começa a implementação real.
