# Tasks — Implementação REAL dos Services de Domínio (azion-flow)

Agora os services deixam de ser cascas vazias e passam a conter **lógica real**, mas ainda controlada, orientada a providers e com testes unitários robustos.

Cada task implementa um serviço específico do domínio (Bucket, FileSync, Application, DomainConfig, ConfigStorage).  
Atomicidade total. Nada de steps aqui — apenas domínio.

---

## 📦 FASE 1 — BucketService

### - [x] **TSERV-001 — Definir contrato de BucketService**

**Arquivo:** `src/domain/bucket/bucket.service.ts`  
**Descrição:**  
Adicionar assinatura dos métodos:

```ts
constructor(private provider: AzionStorageProvider) {}

async listBuckets(): Promise<any[]> {}
async ensureBucket(name: string): Promise<any> {}
```

Sem lógica ainda.  
**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TDOM-002, TAZ-006

---

### - [x] **TSERV-002 — Implementar listBuckets()**

**Descrição:**  
Implementar lógica real:

- chamar `provider.listBuckets()`
- validar formato básico da resposta
- retornar lista  
  **Testes:**
- mock provider retornando lista → garantir retorno igual
- provider lançando erro → propagar erro do domínio  
  **Dependência:** TSERV-001

---

### - [x] **TSERV-003 — Implementar ensureBucket()**

**Descrição:**  
Implementar lógica real:

- carregar lista
- verificar se bucket existe
- se não existe → chamar provider.ensureBucket()
- sempre retornar bucket existente/criado  
  **Testes:**
- bucket já existe → não chamar criação
- bucket não existe → chamar provider.ensureBucket()
- validar retorno final  
  **Dependência:** TSERV-002

---

---

## 📁 FASE 2 — FileSyncService

### - [x] **TSERV-004 — Definir contrato de FileSyncService**

**Arquivo:** `file-sync.service.ts`  
**Descrição:**  
Adicionar assinatura:

```ts
constructor(private provider: NodeFileSystemProvider, private http: AzionStorageProvider) {}

async listLocalFiles(buildDir: string): Promise<string[]> {}
async sync(buildDir: string, bucketName: string): Promise<{ uploaded: number }> {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TDOM-004

---

### - [x] **TSERV-005 — Implementar listLocalFiles()**

**Descrição:**

- chamar provider.listLocalFiles(buildDir)
- validar paths
- retornar lista  
  **Testes:**
- mock FS provider retornando lista → confirmar retorno
- diretório vazio → lista vazia  
  **Dependência:** TSERV-004

---

### - [x] **TSERV-006 — Implementar sync()**

**Descrição:**

- obter lista local
- para cada arquivo:
  - ler do disco
  - enviar usando http provider
- retornar `{ uploaded: quantidade }`  
  **Testes:**
- mock FS + mock provider → contar uploads
- garantir que sync não falha com diretório vazio  
  **Dependência:** TSERV-005

---

---

## ⚙️ FASE 3 — ApplicationService

### - [x] **TSERV-007 — Definir contrato de ApplicationService**

**Arquivo:** `application.service.ts`  
**Descrição:**  
Adicionar assinatura:

```ts
constructor(private provider: AzionApplicationProvider) {}

async listApplications(): Promise<any[]> {}
```

**Dependência:** TDOM-006, TAZ-010

---

### - [x] **TSERV-008 — Implementar listApplications()**

**Descrição:**

- chamar provider.listApplications()
- validar lista
- retornar parseada se necessário  
  **Testes:**
- mock retornando array → validar
- provider erro → propagar  
  **Dependência:** TSERV-007

---

---

## 🌍 FASE 4 — DomainConfigService

### - [x] **TSERV-009 — Definir contrato**

**Arquivo:** `domain-config.service.ts`  
**Descrição:**  
Adicionar assinatura:

```ts
constructor(private provider: AzionDomainProvider) {}

async getConfig(domainId: string): Promise<any> {}
async ensureDomain(domain: string): Promise<any> {}
```

**Dependência:** TDOM-008

---

### - [x] **TSERV-010 — Implementar getConfig()**

**Descrição:**

- chamar provider.getDomainConfig(domainId)
- validar e retornar  
  **Testes:**
- provider retornando config → deve retornar igual
- provider retornando null → retornar null  
  **Dependência:** TSERV-009

---

### - [x] **TSERV-011 — Implementar ensureDomain()**

**Descrição:**  
Implementação simples:

- chamar provider.ensureDomain(domain) (assinatura futura)
- retornar resultado  
  **Testes:**
- mock provider chamado corretamente
- confirmação via retorno  
  **Dependência:** TSERV-009

---

---

## 💾 FASE 5 — ConfigStorageService

### - [x] **TSERV-012 — Definir contrato**

**Arquivo:** `config-storage.service.ts`  
**Descrição:**  
Adicionar assinatura:

```ts
constructor(private provider: FileConfigProvider) {}

async loadConfig(): Promise<any> {}
async saveConfig(data: any): Promise<void> {}
```

**Dependência:** TDOM-010

---

### - [x] **TSERV-013 — Implementar loadConfig()**

**Descrição:**

- chamar provider.read()
- validar json
- retornar objeto  
  **Testes:**
- mock retornando json → retornar objeto
- json inválido → lançar erro de domínio  
  **Dependência:** TSERV-012

---

### - [x] **TSERV-014 — Implementar saveConfig()**

**Descrição:**

- validar dados
- chamar provider.write(data)  
  **Testes:**
- provider.write chamado com json esperado  
  **Dependência:** TSERV-012

---

---

## 🧪 FASE 6 — Testes Integrados do Domínio

### - [x] **TSERV-015 — Criar `tests/domain/bucket.service.test.ts`**

**Testar:** listBuckets + ensureBucket integrados com mocks.

### - [x] **TSERV-016 — Criar `tests/domain/filesync.service.test.ts`**

**Testar:** listLocalFiles + sync.

### - [x] **TSERV-017 — Criar `tests/domain/application.service.test.ts`**

### - [x] **TSERV-018 — Criar `tests/domain/domain-config.service.test.ts`**

### - [x] **TSERV-019 — Criar `tests/domain/config-storage.service.test.ts`**

---

## 🎯 Final

Ao finalizar estas tasks teremos:

- domínio inteiramente funcional
- serviços conectados aos providers
- comportamento real implementado
- testes unitários e integrados
- base perfeita para steps avançados e deploy real

Próximos passos naturais:

🔥 Implementação real do AzionHttpClient  
🔥 Lógica real dos providers Azion (parsing, erros, retries)  
🔥 UX do workflow de deploy na CLI
