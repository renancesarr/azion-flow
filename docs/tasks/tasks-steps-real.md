# Tasks — Implementação REAL dos Steps (azion-flow)

Esta fase transforma os steps que antes eram apenas estrutura **em partes reais, vivas e funcionais** do pipeline de deploy.  
Agora eles passam a:

- chamar services reais
- chamar providers reais
- manipular contexto real
- registrar relatório real
- validar erros de verdade
- gerar side-effects reais (uploads, leituras, consultas, configs, etc.)

Cada task é **atômica**, **cirúrgica** e segue a arquitetura definida.

---

## 🏁 FASE 1 — Preparação do Contexto

### - [ ] **TSTEPREAL-001 — Implementar normalização do contexto inicial**

**Arquivo:** `src/usecases/deploy/context.ts`  
**Descrição:**

- preencher keys mínimas: `projectRoot`, `buildDir`, `bucketName`, `applicationId`, `domain`, `report`
- garantir `report = {}`  
  **Testes:**
- criação com defaults
- criação com overrides  
  **Dependência:** TSTEP-101, TDEP-006

---

## 🏠 FASE 2 — Steps de Ambiente Local

### - [ ] **TSTEPREAL-002 — Implementar ValidateLocalEnvStep REAL**

**Arquivo:** `validate-local-env.step.ts`  
**Descrição REAL:**

- confirmar que `projectRoot` existe
- confirmar que `buildDir` existe
- confirmar permissões de leitura
- salvar status no report  
  **Testes:**
- diretório ausente → erro
- diretório ok → sucesso  
  **Dependência:** TSERVREAL-004

---

### - [ ] **TSTEPREAL-003 — Implementar ReadConfigStep REAL**

**Arquivo:** `read-config.step.ts`  
**Descrição REAL:**

- chamar `ConfigStorageService.loadConfig()`
- mesclar dados no contexto
- salvar config no `report.config`  
  **Testes:**
- config válida
- config ausente  
  **Dependência:** TSERVREAL-011

---

### - [ ] **TSTEPREAL-004 — Implementar ResolvePathsStep REAL**

**Arquivo:** `resolve-paths.step.ts`  
**Descrição REAL:**

- normalizar `projectRoot` e `buildDir`
- resolver paths relativos
- usar utils de path  
  **Testes:**
- relativo → absoluto
- absoluto → mantido  
  **Dependência:** TSERVREAL-011, TCORE-013

---

## ☁️ FASE 3 — Steps de Bucket / Storage

### - [ ] **TSTEPREAL-005 — Implementar ListBucketsStep REAL**

**Arquivo:** `list-buckets.step.ts`  
**Descrição REAL:**

- chamar `BucketService.listBuckets()`
- salvar em `report.buckets`  
  **Testes:**
- mock retornando lista  
  **Dependência:** TSERVREAL-002

---

### - [ ] **TSTEPREAL-006 — Implementar EnsureBucketStep REAL**

**Arquivo:** `ensure-bucket.step.ts`  
**Descrição REAL:**

- decidir bucketName (manual, config, default)
- chamar `BucketService.ensureBucket(bucketName)`
- salvar bucket no contexto
- registrar no report  
  **Testes:**
- bucket existente
- bucket novo  
  **Dependência:** TSERVREAL-003

---

### - [ ] **TSTEPREAL-007 — Implementar SyncFilesStep REAL**

**Arquivo:** `sync-files.step.ts`  
**Descrição REAL:**

- chamar `FileSyncService.sync(buildDir, bucket)`
- registrar estatísticas  
  **Testes:**
- uploads contados
- caso vazio  
  **Dependência:** TSERVREAL-005

---

## ⚙️ FASE 4 — Steps de Application

### - [ ] **TSTEPREAL-008 — Implementar ListApplicationsStep REAL**

**Arquivo:** `list-applications.step.ts`  
**Descrição REAL:**

- chamar `ApplicationService.listApplications()`
- salvar em `report.applications`  
  **Testes:**
- mock retornando lista  
  **Dependência:** TSERVREAL-007

---

### - [ ] **TSTEPREAL-009 — Implementar SelectApplicationStep REAL**

**Arquivo:** `select-application.step.ts`  
**Descrição REAL:**

- se `applicationId` no contexto → manter
- senão: usar primeira aplicação da lista
- salvar no contexto
- registrar no report  
  **Testes:**
- id explícito
- fallback automático  
  **Dependência:** TSERVREAL-008

---

## 🌍 FASE 5 — Steps de Domain Config

### - [ ] **TSTEPREAL-010 — Implementar GetDomainConfigStep REAL**

**Arquivo:** `get-domain-config.step.ts`  
**Descrição REAL:**

- se não houver domain → registrar e pular
- chamar `DomainConfigService.getConfig(domainId)`
- registrar config  
  **Testes:**
- domain inexistente
- config encontrada  
  **Dependência:** TSERVREAL-009

---

### - [ ] **TSTEPREAL-011 — Implementar EnsureDomainStep REAL**

**Arquivo:** `ensure-domain.step.ts`  
**Descrição REAL:**

- se domain estiver vazio → não faz nada
- chamar `DomainConfigService.ensureDomain(domain)`
- salvar resultado no report  
  **Testes:**
- chamada feita quando domain existe
- nenhuma chamada quando domain não existe  
  **Dependência:** TSERVREAL-010

---

## 📊 FASE 6 — Step de Relatório Final

### - [ ] **TSTEPREAL-012 — Implementar GenerateReportStep REAL**

**Arquivo:** `generate-report.step.ts`  
**Descrição REAL:**

- consolidar todas informações do contexto
- gerar timestamp
- gerar resumo como objeto final limpo
- não chamar nenhuma API  
  **Testes:**
- snapshot do report
- campos obrigatórios presentes  
  **Dependência:** TSTEPREAL-002..011

---

## 🔄 FASE 7 — Testes Integrados dos Steps Reais

### - [ ] **TSTEPREAL-013 — Teste integrado buckets**

Arquivo: `tests/steps/bucket-flow.real.test.ts`  
Fluxo:

- list
- ensure
- sync

---

### - [ ] **TSTEPREAL-014 — Teste integrado applications**

Arquivo: `tests/steps/application-flow.real.test.ts`

---

### - [ ] **TSTEPREAL-015 — Teste integrado domain**

Arquivo: `tests/steps/domain-flow.real.test.ts`

---

### - [ ] **TSTEPREAL-016 — Teste integrado relatório**

Arquivo: `tests/steps/report-flow.real.test.ts`

---

## 🎯 FINAL

Ao fim dessa fase teremos:

- Steps 100% funcionais
- Interação real com domínio + providers
- Dados reais fluindo pelo contexto
- Deploy montado passo a passo
- Fluxo pronto para ser conectado ao orchestrator final

Próximos passos naturais:

🔥 Tasks do fluxo FINAL de deploy REAL  
🔥 Tasks de UX e logs avançados na CLI  
🔥 Tasks de publicação e release
