# Tasks — Domínio (azion-flow)

Estas tasks criam toda a estrutura do **domínio**, seguindo fielmente a arquitetura.  
Cada task é atômica, granular e sem implementação de lógica avançada — apenas estrutura, tipos e contratos necessários para que Use Cases, Steps e Providers possam existir.

---

## 📦 FASE DOMAIN — Bucket

### - [x] **TDOM-001 — Criar arquivo `src/domain/bucket/bucket.entity.ts`**

**Descrição:**  
Criar entidade Bucket com campos ainda vazios, apenas a estrutura:

```ts
export interface BucketEntity {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TSTR-007

---

### - [x] **TDOM-002 — Criar arquivo `src/domain/bucket/bucket.service.ts`**

**Descrição:**  
Criar service vazio com classe:

```ts
export class BucketService {}
```

Sem implementação.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TDOM-001

---

## 📦 FASE DOMAIN — File Sync

### - [x] **TDOM-003 — Criar arquivo `src/domain/filesync/file-sync.entity.ts`**

**Descrição:**  
Criar entidade representando operação de sincronização (vazia por agora).

```ts
export interface FileSyncEntity {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-007

---

### - [x] **TDOM-004 — Criar arquivo `src/domain/filesync/file-sync.service.ts`**

**Descrição:**  
Criar serviço com estrutura básica:

```ts
export class FileSyncService {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TDOM-003

---

## 📦 FASE DOMAIN — Application

### - [x] **TDOM-005 — Criar arquivo `src/domain/application/application.entity.ts`**

**Descrição:**  
Criar entidade Application com estrutura inicial vazia:

```ts
export interface ApplicationEntity {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-007

---

### - [x] **TDOM-006 — Criar arquivo `src/domain/application/application.service.ts`**

**Descrição:**  
Criar classe de service vazia:

```ts
export class ApplicationService {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TDOM-005

---

## 📦 FASE DOMAIN — Domain Config

### - [x] **TDOM-007 — Criar arquivo `src/domain/domain-config/domain-config.entity.ts`**

**Descrição:**  
Criar entidade DomainConfig vazia:

```ts
export interface DomainConfigEntity {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-007

---

### - [x] **TDOM-008 — Criar arquivo `src/domain/domain-config/domain-config.service.ts`**

**Descrição:**  
Criar service base:

```ts
export class DomainConfigService {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TDOM-007

---

## 📦 FASE DOMAIN — Config Storage

### - [x] **TDOM-009 — Criar arquivo `src/domain/config-storage/config-storage.entity.ts`**

**Descrição:**  
Criar entidade ConfigStorage vazia:

```ts
export interface ConfigStorageEntity {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TSTR-007

---

### - [x] **TDOM-010 — Criar arquivo `src/domain/config-storage/config-storage.service.ts`**

**Descrição:**  
Criar classe de service vazia:

```ts
export class ConfigStorageService {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** TDOM-009

---

## 📚 FASE DOMAIN — Indexação e Tipos Compartilhados

### - [x] **TDOM-011 — Criar `src/domain/index.ts`**

**Descrição:**  
Arquivo exportador central para todos os subdomínios.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes:** Arquivo existe  
**Dependência:** Todas tasks anteriores

---

### - [x] **TDOM-012 — Criar `tests/domain/smoke.test.ts`**

**Descrição:**  
Smoke test global do domínio:

```ts
import { describe, it, expect } from "vitest";
import * as domain from "../../src/domain";

describe("Domain Layer", () => {
  it("should load without crashing", () => {
    expect(domain).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes:** Teste deve passar  
**Dependência:** TDOM-011

---

## 🎯 Final da Fase Domain

Após concluir estas tasks, teremos:

- entidades do domínio
- serviços vazios mas estruturados
- diretórios organizados
- smoke tests garantindo integridade
- domínio pronto para ser conectado aos providers e aos use cases

Essa fase prepara tudo para:

🔥 tasks dos Providers  
🔥 tasks dos UseCases  
🔥 tasks dos Steps  
🔥 tasks de integração com Azion
