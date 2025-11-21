# Tasks — Integração com a API da Azion (azion-flow)

Esta fase transforma o projeto de uma estrutura vazia em uma CLI funcional, conectando **Domínio → Providers → API Azion v4**.  
As tasks são **atômicas**, **granulares** e seguem a ordem real de desenvolvimento.

---

## 🌐 FASE 1 — Infraestrutura de HTTP e Autenticação

### - [ ] **TAZ-001 — Criar constantes de endpoints da API**

**Arquivo:** `src/providers/azion/http/endpoints.ts`  
**Descrição:** Criar arquivo para armazenar endpoints base (sem paths ainda).  
**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TPROV-004

---

### - [ ] **TAZ-002 — Criar classe de error HTTP da Azion**

**Arquivo:** `src/providers/azion/http/http-error.ts`  
**Descrição:**  
Classe vazia extendendo BaseError.  
**RFs:** null  
**NRFs:** RNF-003  
**Dependência:** TCORE-005, TPROV-004

---

### - [ ] **TAZ-003 — Adicionar método `request()` na classe `AzionHttpClient`**

**Arquivo:** `src/providers/azion/http/http-client.ts`  
**Descrição:**  
Adicionar assinatura vazia:

```ts
async request(req: HttpRequest): Promise<HttpResponse> {}
```

**RFs:** RF-AZION-HTTP (futuro)  
**NRFs:** RNF-001, RNF-003  
**Dependência:** TPROV-002, TPROV-003

---

### - [ ] **TAZ-004 — Adicionar suporte a token no cliente HTTP**

**Descrição:**  
Adicionar campo `token?: string` (somente atributo, sem lógica).  
**RFs:** null  
**NRFs:** RNF-003  
**Dependência:** TAZ-003

---

---

## ☁️ FASE 2 — Integração com Edge Storage (Buckets)

### - [ ] **TAZ-005 — Criar arquivo de mapeamento de bucket (DTO)**

**Arquivo:** `src/providers/azion/storage/bucket.dto.ts`  
**Descrição:**  
Criar interface vazia para mapear response da Azion.  
**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TPROV-005

---

### - [ ] **TAZ-006 — Implementar método `listBuckets()` no StorageProvider (assinatura vazia)**

**Arquivo:** `src/providers/azion/azion.storage.ts`  
**Descrição:**  
Adicionar método:

```ts
async listBuckets(): Promise<any> {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TAZ-005

---

### - [ ] **TAZ-007 — Implementar método `ensureBucket()` (assinatura vazia)**

**Descrição:**  
Adicionar:

```ts
async ensureBucket(name: string): Promise<any> {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TAZ-006

---

### - [ ] **TAZ-008 — Integrar provider de Bucket ao domínio**

**Arquivo:** `src/domain/bucket/bucket.service.ts`  
**Descrição:**  
Adicionar construtor vazio que recebe provider.  
**Dependência:** TDOM-002, TAZ-006

---

---

## ⚙️ FASE 3 — Integração com Applications

### - [ ] **TAZ-009 — Criar DTO para Application**

**Arquivo:** `src/providers/azion/application/application.dto.ts`  
**Descrição:**  
Criar interface vazia.  
**RFs:** null  
**NRFs:** RNF-001  
**Dependência:** TPROV-006

---

### - [ ] **TAZ-010 — Criar método `listApplications()` (assinatura vazia)**

**Arquivo:** `src/providers/azion/azion.application.ts`  
**Descrição:**  
Adicionar método:

```ts
async listApplications(): Promise<any> {}
```

**Dependência:** TAZ-009

---

### - [ ] **TAZ-011 — Integrar provider Application ao domínio**

**Arquivo:** `src/domain/application/application.service.ts`  
**Descrição:**  
Adicionar construtor vazio com provider.  
**Dependência:** TDOM-006, TAZ-010

---

---

## 🌍 FASE 4 — Integração com Domain Config

### - [ ] **TAZ-012 — Criar DTO para Domain Config**

**Arquivo:** `src/providers/azion/domain/domain.dto.ts`  
**Descrição:** Interface vazia.  
**Dependência:** TPROV-007

---

### - [ ] **TAZ-013 — Criar método `getDomainConfig()` (assinatura vazia)**

**Arquivo:** `src/providers/azion/azion.domain.ts`  
**Descrição:**  
Adicionar:

```ts
async getDomainConfig(domainId: string): Promise<any> {}
```

**Dependência:** TAZ-012

---

### - [ ] **TAZ-014 — Integrar DomainConfigProvider ao domínio**

**Arquivo:** `src/domain/domain-config/domain-config.service.ts`  
**Descrição:**  
Adicionar construtor com provider.  
**Dependência:** TDOM-008, TAZ-013

---

---

## 💾 FASE 5 — Integração com File Sync (Local vs Azion)

### - [ ] **TAZ-015 — Criar DTO para FileSync**

**Arquivo:** `src/providers/filesystem/filesync.dto.ts`  
**Dependência:** TPROV-008

---

### - [ ] **TAZ-016 — Criar método `listLocalFiles()`/`readFile()` (assinaturas vazias)**

**Arquivo:** `src/providers/filesystem/nodefs.ts`  
**Dependência:** TPROV-008

---

### - [ ] **TAZ-017 — Integrar FileSyncProvider ao domínio**

**Arquivo:** `src/domain/filesync/file-sync.service.ts`  
**Dependência:** TDOM-004, TAZ-016

---

---

## 🔗 FASE 6 — Conectar Providers → UseCase Deploy

### - [ ] **TAZ-018 — Atualizar `createDeployUseCase()`**

**Arquivo:** `src/usecases/deploy/deploy.factory.ts`  
**Descrição:**  
Adicionar ligações (somente instanciando providers e services).  
Sem lógica de flow.  
**Dependência:** TUC-006, TAZ-008, TAZ-011, TAZ-014, TAZ-017

---

### - [ ] **TAZ-019 — Atualizar `DeployUseCase.execute()`**

**Descrição:**  
Aceitar steps, services e providers via construtor (sem lógica).  
**Dependência:** TUC-001, TAZ-018

---

---

## 🧪 FASE 7 — Testes de Integração Inicial (sem API real)

### - [ ] **TAZ-020 — Criar `tests/integration/azion-client.test.ts`**

**Descrição:**  
Smoke test para garantir que instância do cliente HTTP carrega.  
**Dependência:** TAZ-004

---

### - [ ] **TAZ-021 — Criar `tests/integration/deploy-factory.test.ts`**

**Descrição:**  
Testar se a factory monta corretamente as dependências.  
**Dependência:** TAZ-018

---

## 🎯 FINAL

Com essa fase concluída teremos:

- Providers conectados ao domínio
- Domínio conectado aos use cases
- DTOs mapeados
- Camada HTTP estruturada e autenticável
- Deploy Use Case pronto para execução real
- Smoke tests garantindo integridade

Próximas fases:

🔥 Tasks de Requests Reais (GET, POST, PATCH)  
🔥 Tasks de Mapeamento Completo dos Endpoints  
🔥 Tasks de Fluxo Real de Deploy  
🔥 Tasks de Validação e UX da CLI
