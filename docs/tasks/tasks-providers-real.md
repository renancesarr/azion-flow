# Tasks — Implementação REAL dos Providers da Azion (azion-flow)

Esta fase transforma os providers da Azion em módulos totalmente funcionais, capazes de fazer requests _reais_ para a API v4.  
Esses providers são a **ponte entre o domínio e a internet**, e precisam ser implementados com robustez, simplicidade e observabilidade.

As tasks abaixo seguem atomicidade total.

---

## 🌐 FASE 1 — AzionHttpClient (core de tudo)

### - [ ] **TPROVREAL-001 — Implementar classe de configuração do cliente HTTP**

**Arquivo:** `src/providers/azion/http/http-config.ts`  
**Descrição:**  
Criar interface e defaults:

```ts
export interface HttpClientConfig {
  token: string;
  timeoutMs?: number;
  baseUrl?: string;
}
```

**Dependência:** TPROV-004

---

### - [ ] **TPROVREAL-002 — Implementar headers padrão**

**Arquivo:** `http-client.ts`  
**Descrição:**  
Adicionar método interno:

```ts
private buildHeaders() { ... }
```

Headers:

- Authorization: Bearer {token}
- Accept: application/json
- Content-Type: application/json
- User-Agent: azion-flow/0.1

**Dependência:** TPROVREAL-001

---

### - [ ] **TPROVREAL-003 — Implementar método GET real**

**Descrição:**  
Implementar `get(url: string)` chamando fetch com headers, timeout e parse JSON.  
**Testes:**

- mock fetch → retorno parseado
- timeout → erro
- body inválido → erro específico  
  **Dependência:** TPROVREAL-002

---

### - [ ] **TPROVREAL-004 — Implementar método POST real**

**Descrição:**  
Implementar `post(url, body)`.  
**Testes:** mock igual ao GET.  
**Dependência:** TPROVREAL-002

---

### - [ ] **TPROVREAL-005 — Implementar método PATCH real**

**Descrição:**  
Implementar `patch(url, body)`.  
**Dependência:** TPROVREAL-002

---

### - [ ] **TPROVREAL-006 — Implementar método DELETE real**

**Descrição:**  
Implementar `delete(url)`.  
**Dependência:** TPROVREAL-002

---

### - [ ] **TPROVREAL-007 — Implementar tratamento de erros HTTP**

**Descrição:**  
Criar função interna:

```ts
private async handleHttpError(res: Response)
```

Regras:

- 4xx → new AzionHttpError(...)
- 5xx → new AzionHttpError(...)
- JSON inválido → erro específico  
  **Dependência:** TPROVREAL-003,004,005

---

### - [ ] **TPROVREAL-008 — Implementar lógica de timeout**

**Descrição:**  
Usar AbortController para abortar requests.  
**Dependência:** TPROVREAL-003

---

### - [ ] **TPROVREAL-009 — Implementar logging opcional**

**Arquivo:** `http-client.ts`  
**Descrição:**  
Se `process.env.AZION_FLOW_DEBUG=1`, logar requests/responses.  
**Dependência:** TPROVREAL-003

---

## 🪣 FASE 2 — StorageProvider (Buckets e Upload)

### - [ ] **TPROVREAL-010 — Criar URL builder para buckets**

**Arquivo:** `endpoints.ts`  
**Descrição:**  
Adicionar funções:

```ts
export const getBucketsUrl = () => `/edge_storage/buckets`;
export const createBucketUrl = () => `/edge_storage/buckets`;
export const uploadFileUrl = (bucket, path) =>
  `/edge_storage/buckets/${bucket}/files/${path}`;
```

**Dependência:** TAZ-001

---

### - [ ] **TPROVREAL-011 — Implementar listBuckets() real**

**Arquivo:** `azion.storage.ts`  
**Descrição:**  
Usar:

```ts
this.http.get(getBucketsUrl());
```

Parsear estrutura real da Azion:

- pegar `.results`
- normalizar nomes  
  **Testes:**
- mock http.get retornando results → validar parse  
  **Dependência:** TPROVREAL-003

---

### - [ ] **TPROVREAL-012 — Implementar ensureBucket() real**

**Descrição:**

- chamar listBuckets
- se nome não existir → chamar POST createBucketUrl
- retornar bucket  
  **Testes:**
- mock bucket existente
- mock bucket ausente  
  **Dependência:** TPROVREAL-011

---

### - [ ] **TPROVREAL-013 — Implementar upload de arquivos**

**Descrição:**  
Usar fetch com body raw ou multipart:

```ts
await this.http.put(uploadFileUrl(bucket, filename), fileBuffer);
```

**Testes:**

- mock para upload simples  
  **Dependência:** TPROVREAL-012

---

## 🧩 FASE 3 — ApplicationProvider

### - [ ] **TPROVREAL-014 — Criar URL builder para aplicações**

**Arquivo:** `endpoints.ts`

```ts
export const listApplicationsUrl = () => `/applications`;
```

**Dependência:** TAZ-001

---

### - [ ] **TPROVREAL-015 — Implementar listApplications() real**

**Arquivo:** `azion.application.ts`  
**Descrição:**

- chamar GET listApplicationsUrl
- parse de results
- retornar array de apps  
  **Testes:**
- mock retornando lista → validar parse  
  **Dependência:** TPROVREAL-014, TPROVREAL-003

---

## 🌍 FASE 4 — DomainConfigProvider

### - [ ] **TPROVREAL-016 — Criar URL builder para domain config**

**Arquivo:** `endpoints.ts`

```ts
export const getDomainConfigUrl = (domainId) => `/domains/${domainId}/config`;
```

**Dependência:** TAZ-001

---

### - [ ] **TPROVREAL-017 — Implementar getDomainConfig() real**

**Arquivo:** `azion.domain.ts`  
**Descrição:**

- chamar GET url
- parse
- retornar config  
  **Testes:**
- mock retornando config  
  **Dependência:** TPROVREAL-016

---

### - [ ] **TPROVREAL-018 — Implementar ensureDomain() real**

**Descrição:**

- checar config
- decidir se altera ou cria config
- PATCH com valores necessários  
  **Dependência:** TPROVREAL-017

---

## 🧪 FASE 5 — Testes Reais dos Providers (com mocks de fetch)

### - [ ] **TPROVREAL-019 — Criar `tests/providers/http-client.test.ts`**

Testar:

- GET/POST/PATCH/DELETE
- timeout
- parse json
- error 400/500

---

### - [ ] **TPROVREAL-020 — Criar `tests/providers/storage-provider.test.ts`**

Testar:

- listBuckets
- ensureBucket
- upload

---

### - [ ] **TPROVREAL-021 — Criar `tests/providers/application-provider.test.ts`**

---

### - [ ] **TPROVREAL-022 — Criar `tests/providers/domain-provider.test.ts`**
