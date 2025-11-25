# Tasks — Implementação REAL dos Steps de Deploy (azion-flow)

Esta fase transforma os steps de deploy de **placeholders** em componentes funcionais.  
Cada task implementa **uma responsabilidade única** em um step específico, com testes unitários associados.

Os steps já criados (estrutura) foram definidos em:

- `src/usecases/deploy/steps/raw-steps/*.ts`
- IDs: TSTEP-003 a TSTEP-013

Agora vamos implementar a lógica real, de forma incremental.

---

## 🔧 FASE 1 — Contexto e Tipagem dos Steps

### - [x] **TSTEP-101 — Definir tipo forte de contexto de deploy**

**Arquivo:** `src/usecases/deploy/types.ts`  
**Descrição:**  
Substituir `DeployContext` e `DeployResult` vazios por interfaces mínimas contendo:

- `projectRoot: string`
- `buildDir: string`
- `bucketName?: string`
- `applicationId?: string`
- `domain?: string`
- `report: Record<string, unknown>`  
  **RFs:** null  
  **NRFs:** RNF-001  
  **Testes Unitários:**
- Criar teste em `tests/usecases/deploy.types.test.ts` validando que o tipo é exportado e utilizável.  
  **Dependência:** TUC-005

---

### - [x] **TSTEP-102 — Atualizar `DeployStepBase` para usar `DeployContext` tipado**

**Arquivo:** `src/usecases/deploy/steps/step.base.ts`  
**Descrição:**  
Atualizar assinatura para:

```ts
import { DeployContext } from "../types";

export abstract class DeployStepBase {
  abstract execute(context: DeployContext): Promise<void>;
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Ajustar import nos steps existentes (sem lógica).
- Rodar `vitest` para garantir que não quebrou compilação.  
  **Dependência:** TSTEP-101, TSTEP-002

---

## 🏠 FASE 2 — Steps de Preparação Local

### - [x] **TSTEP-103 — Implementar `ValidateLocalEnvStep` (checagem de diretório de build)**

**Arquivo:** `validate-local-env.step.ts`  
**Descrição:**  
Implementar lógica mínima para:

- verificar se `buildDir` está definido no contexto;
- verificar se o diretório existe via provider de FS (NodeFileSystemProvider ou service correspondente);
- lançar erro de domínio amigável caso não exista.  
  **RFs:** null  
  **NRFs:** RNF-003, RNF-004  
  **Testes Unitários:**
- mockar FS provider para simular diretório existente → step não lança;
- simular diretório ausente → step lança erro esperado.  
  **Dependência:** TSTEP-003, TDOM-004, TAZ-017

---

### - [x] **TSTEP-104 — Implementar `ReadConfigStep`**

**Arquivo:** `read-config.step.ts`  
**Descrição:**  
Implementar step que:

- usa `ConfigStorageService` para ler config local;
- preenche no contexto campos como `projectRoot`, `buildDir` (caso venham da config);
- não lança erro se config estiver vazia, apenas mantém valores atuais.  
  **RFs:** null  
  **NRFs:** RNF-001  
  **Testes Unitários:**
- mock de `ConfigStorageService` retornando config válida → contexto atualizado;
- mock retornando `null`/vazio → contexto permanece com valores default.  
  **Dependência:** TSTEP-004, TDOM-010

---

### - [x] **TSTEP-105 — Implementar `ResolvePathsStep`**

**Arquivo:** `resolve-paths.step.ts`  
**Descrição:**  
Implementar step que:

- usa utils de path (`src/core/utils/fs/path.ts`) para normalizar `projectRoot` e `buildDir`;
- garante que os caminhos são absolutos;
- grava no contexto os paths normalizados.  
  **RFs:** null  
  **NRFs:** RNF-001  
  **Testes Unitários:**
- testar que paths relativos são convertidos em absolutos;
- testar que paths absolutos são mantidos.  
  **Dependência:** TSTEP-005, TCORE-013

---

## ☁️ FASE 3 — Steps de Buckets (Azion Edge Storage)

### - [x] **TSTEP-106 — Implementar `ListBucketsStep`**

**Arquivo:** `list-buckets.step.ts`  
**Descrição:**  
Implementar step que:

- usa `BucketService` → que por sua vez usa `AzionStorageProvider.listBuckets()`;
- obtém lista de buckets e armazena no `context.report["buckets"]`.  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- mock de `BucketService.listBuckets` retornando array → contexto contém essa info em `report`.  
  **Dependência:** TSTEP-006, TDOM-002, TAZ-006

---

### - [x] **TSTEP-107 — Implementar `EnsureBucketStep`**

**Arquivo:** `ensure-bucket.step.ts`  
**Descrição:**  
Implementar step que:

- lê do contexto o `bucketName` (ou gera default se futuro);
- usa `BucketService.ensureBucket(name)`;
- armazena no contexto o identificador do bucket;
- registra no report status `"bucketEnsured": true`.  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- mock do service garantindo que `ensureBucket` foi chamado com nome correto;
- verificação de que o contexto foi atualizado.  
  **Dependência:** TSTEP-007, TSTEP-106

---

### - [x] **TSTEP-108 — Implementar `SyncFilesStep`**

**Arquivo:** `sync-files.step.ts`  
**Descrição:**  
Implementar step que:

- consulta `FileSyncService` passando `buildDir` + bucket;
- não precisa implementar algoritmo sofisticado, apenas chamar método `sync()` do domínio (futuro);
- registra no report a quantidade de arquivos sincronizados (mockado por enquanto).  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- mock de `FileSyncService.sync` retornando métricas → as mesmas são colocadas no report.  
  **Dependência:** TSTEP-008, TDOM-004, TAZ-017

---

## ⚙️ FASE 4 — Steps de Application (Azion Applications)

### - [x] **TSTEP-109 — Implementar `ListApplicationsStep`**

**Arquivo:** `list-applications.step.ts`  
**Descrição:**  
Implementar step que:

- usa `ApplicationService` → `AzionApplicationProvider.listApplications()`;
- armazena lista no report.  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- mock de `ApplicationService.listApplications` → contexto.report atualizado.  
  **Dependência:** TSTEP-009, TDOM-006, TAZ-010

---

### - [x] **TSTEP-110 — Implementar `SelectApplicationStep`**

**Arquivo:** `select-application.step.ts`  
**Descrição:**  
Implementar step que:

- seleciona uma aplicação com base em critérios simples (por enquanto, a primeira da lista ou ID pré-configurado em contexto);
- armazena `applicationId` no contexto;
- registra no report qual aplicação foi selecionada.  
  **RFs:** null  
  **NRFs:** RNF-001  
  **Testes Unitários:**
- se existir `applicationId` no contexto → não altera;
- se não existir → pega a primeira da lista mockada;
- valida que o report contém info da aplicação.  
  **Dependência:** TSTEP-010, TSTEP-109

---

## 🌍 FASE 5 — Steps de Domain Config

### - [x] **TSTEP-111 — Implementar `GetDomainConfigStep`**

**Arquivo:** `get-domain-config.step.ts`  
**Descrição:**  
Implementar step que:

- usa `DomainConfigService` + `AzionDomainProvider.getDomainConfig()`;
- preenche `context.report["domainConfig"]`;
- não falha se não houver domínio configurado (depende do provider).  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- mock retornando config → contexto atualizado;
- mock retornando vazio → contexto sem erro.  
  **Dependência:** TSTEP-011, TDOM-008, TAZ-014

---

### - [x] **TSTEP-112 — Implementar `EnsureDomainStep`**

**Arquivo:** `ensure-domain.step.ts`  
**Descrição:**  
Implementar step que:

- verifica se contexto possui `domain`;
- se possuir, chama `DomainConfigService.ensureDomain(domain)` (assinatura futura);
- registra resultado no report.  
  **RFs:** null  
  **NRFs:** RNF-004  
  **Testes Unitários:**
- se `context.domain` undefined → não chama service;
- se definido → chama;
- report contém `"domainEnsured": true` quando chamado.  
  **Dependência:** TSTEP-012, TSTEP-111

---

## 📊 FASE 6 — Step Final de Relatório

### - [x] **TSTEP-113 — Implementar `GenerateReportStep`**

**Arquivo:** `generate-report.step.ts`  
**Descrição:**  
Implementar step que:

- consolida informações do `context.report`;
- adiciona timestamp;
- garante formato estável para saída;
- não chama nenhum provider.  
  **RFs:** null  
  **NRFs:** RNF-003, RNF-004  
  **Testes Unitários:**
- contexto com dados parciais → relatório final contém esses dados + timestamp;
- snapshot test opcional com Vitest (usar toMatchObject).  
  **Dependência:** TSTEP-013, todos os steps anteriores desta fase

---

## 🧪 FASE 7 — Testes de Integração Parcial dos Steps

### - [x] **TSTEP-114 — Criar teste `tests/usecases/steps/bucket-flow.test.ts`**

**Descrição:**  
Teste de integração entre: `ListBucketsStep` + `EnsureBucketStep` + `SyncFilesStep` com mocks simples dos serviços.  
**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:**

- verificar que os três steps podem ser executados em sequência sem falha, com contexto fake.  
  **Dependência:** TSTEP-106, TSTEP-107, TSTEP-108

---

### - [x] **TSTEP-115 — Criar teste `tests/usecases/steps/application-flow.test.ts`**

**Descrição:**  
Integração entre `ListApplicationsStep` e `SelectApplicationStep`.  
**Dependência:** TSTEP-109, TSTEP-110

---

### - [x] **TSTEP-116 — Criar teste `tests/usecases/steps/domain-flow.test.ts`**

**Descrição:**  
Integração entre `GetDomainConfigStep` e `EnsureDomainStep`.  
**Dependência:** TSTEP-111, TSTEP-112

---

## 🎯 FINAL

Ao concluir essas tasks, teremos:

- steps de deploy realmente implementados (ainda com lógica simples, mas funcional);
- domínio conectado a cada step via services e providers;
- contexto tipado carregando dados por todo fluxo;
- relatórios coerentes com o que foi executado;
- testes unitários e de integração garantindo que os passos podem rodar em sequência.

Próximas fases naturais:

🔥 Refino de lógica real dos services (Bucket, FileSync, Application, DomainConfig);  
🔥 Logs e tratamento de erros passo a passo;  
🔥 Integração com CLI para exibir o relatório final do deploy.
