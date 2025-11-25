# Tasks — Implementação REAL dos Services de Domínio (azion-flow)

Agora que os **providers reais** da Azion foram definidos, esta fase transforma os **services de domínio** em componentes funcionais completos, capazes de coordenar validações, orquestrar providers, consolidar resultados e expor uma API limpa para os steps e para o deploy.

Cada task é **cirúrgica**, **granular** e foca em completar o comportamento central do domínio.

---

## 📦 FASE 1 — BucketService (Domínio de Storage)

### - [x] **TSERVREAL-001 — Implementar validação de nome de bucket**

**Arquivo:** `domain/bucket/bucket.service.ts`  
Regras mínimas:

- não pode ser vazio
- remover espaços
- lowercase
- substituir caracteres inválidos  
  Testes:
- nomes válidos → ok
- nomes inválidos → sanitized  
  Dependência: TSERV-001

---

### - [x] **TSERVREAL-002 — Implementar método real listBuckets()**

**Descrição:**

- chamar provider real
- mapear resposta
- converter nomes e IDs  
  Testes:
- mock provider → validar mapeamento  
  Dependência: TPROVREAL-011

---

### - [x] **TSERVREAL-003 — Implementar ensureBucket() real**

**Descrição:**

- chamar listBuckets
- verificar existência
- criar se necessário
- retornar bucket resultante  
  Testes:
- bucket já existe
- bucket não existe  
  Dependência: TSERVREAL-002, TPROVREAL-012

---

## 📁 FASE 2 — FileSyncService (Domínio de Sincronização)

### - [x] **TSERVREAL-004 — Implementar listLocalFiles() real**

**Descrição:**

- usar FS provider
- recursão para subpastas
- ignorar arquivos ocultos  
  Testes:
- diretório com várias estruturas  
  Dependência: TSERV-004

---

### - [x] **TSERVREAL-005 — Implementar algoritmo simples de upload**

**Descrição:**

- obter lista de arquivos
- enviar arquivo por arquivo
- contar uploads
- montar estatísticas básicas  
  Testes:
- mock upload → contar uploads  
  Dependência: TPROVREAL-013, TSERVREAL-004

---

### - [x] **TSERVREAL-006 — Implementar diff mínimo (opcional nesta fase)**

**Descrição:**  
Comparar lista local vs lista remota (se provider permitir).  
Testes:

- evitar upload repetido  
  Dependência: TSERVREAL-005

---

## ⚙️ FASE 3 — ApplicationService

### - [x] **TSERVREAL-007 — Implementar listApplications() real**

**Descrição:**

- chamar provider
- mapear estrutura da Azion
- retornar lista enxuta (id, name)  
  Testes:
- mock provider com dados reais  
  Dependência: TPROVREAL-015

---

### - [x] **TSERVREAL-008 — Implementar selectApplication(criteria)**

**Descrição:**  
Critérios:

- ID explícito
- nome explícito
- fallback: primeira aplicação  
  Testes:
- vários casos de seleção  
  Dependência: TSERVREAL-007

---

## 🌍 FASE 4 — DomainConfigService

### - [x] **TSERVREAL-009 — Implementar getConfig(domainId) real**

**Descrição:**

- chamar provider
- normalizar estrutura  
  Testes:
- mock config real  
  Dependência: TPROVREAL-017

---

### - [x] **TSERVREAL-010 — Implementar ensureDomain(domainName) real**

**Descrição:**

- obter config
- se inexistente → criar
- se existente mas incompleta → atualizar  
  Testes:
- domain inexistente
- domain existente  
  Dependência: TSERVREAL-009, TPROVREAL-018

---

## 💾 FASE 5 — ConfigStorageService

### - [x] **TSERVREAL-011 — Implementar loadConfig() com validações**

**Descrição:**

- ler arquivo
- validar JSON
- validar campos esperados  
  Testes:
- arquivo válido
- arquivo inválido  
  Dependência: TSERV-012

---

### - [x] **TSERVREAL-012 — Implementar saveConfig() real**

**Descrição:**

- validar dados
- salvar JSON formatado
- criar diretório se necessário  
  Testes:
- escrita correta  
  Dependência: TSERV-012

---

## 🪢 FASE 6 — Integração entre Services (Domínio Completo)

### - [x] **TSERVREAL-013 — Criar objeto agregador DomainServices**

**Arquivo:** `domain/domain-services.ts`  
Descrição:  
Exportar todos services construídos:

- BucketService
- FileSyncService
- ApplicationService
- DomainConfigService
- ConfigStorageService  
  Permitir criação fácil via factory.  
  Dependência: Todos anteriores

---

### - [x] **TSERVREAL-014 — Criar factory `createDomainServices()`**

**Arquivo:** `domain/services.factory.ts`  
Descrição:  
Instanciar todos services com providers corretos.  
Dependência: TSERVREAL-013

---

## 🧪 FASE 7 — Testes de Integração do Domínio

### - [x] **TSERVREAL-015 — Criar teste `tests/domain/integration/bucket.test.ts`**

Testar fluxo real:

- ensureBucket
- listBuckets  
  Dependência: TSERVREAL-003

---

### - [x] **TSERVREAL-016 — Criar teste `tests/domain/integration/filesync.test.ts`**

Dependência: TSERVREAL-005

---

### - [x] **TSERVREAL-017 — Criar teste `tests/domain/integration/applications.test.ts`**

Dependência: TSERVREAL-008

---

### - [x] **TSERVREAL-018 — Criar teste `tests/domain/integration/domainconfig.test.ts`**

Dependência: TSERVREAL-010

---

## 🎯 FINAL

Com esta fase concluída teremos:

- domínio REAL funcionando com providers reais
- services capazes de executar o deploy completo
- integração estável e previsível
- testes unitários e integrados garantindo comportamento
- base sólida para os Steps REALMENTE funcionarem

Próximos passos naturais:

🔥 implementação real dos Steps com domínio + providers  
🔥 fluxo completo do deploy REAL  
🔥 UX e logs avançados da CLI
