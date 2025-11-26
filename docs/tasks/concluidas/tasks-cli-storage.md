# Tasks — CLI de Storage (Buckets e Credenciais)

Objetivo: permitir que a CLI `azion-flow` gerencie buckets e credenciais de storage na Azion (criar/listar), usando token fornecido pelo usuário (sem depender de env implícito).

## 🪙 Token e autenticação

### - [x] **TCLI-STO-001 — Reutilizar prompt de token na CLI de storage**

**Arquivo:** `src/cli/utils/token-prompt.ts`  
**Descrição:**

- Garantir que comandos de storage invoquem o prompt se não houver token em memória.
- Não usar env implícito; sempre fluxo interativo ou flag futura.

### - [x] **TCLI-STO-002 — Permitir `--token` como flag opcional**

**Arquivo:** `src/cli/commands/storage/*.ts` (novo)  
**Descrição:**

- Se `--token` for informado, setar diretamente no token-store (memória) antes das chamadas.

## 🪣 Buckets

### - [x] **TCLI-STO-003 — Criar comando `storage buckets list`**

**Arquivo:** `src/cli/commands/storage/buckets.ts`  
**Descrição:**

- Lista buckets via `AzionStorageProvider.listBuckets()`.
- Output: tabela simples (nome/id) e `--json` para saída bruta.
- Flags: `--json`, `--token`.

### - [x] **TCLI-STO-004 — Criar comando `storage buckets create <name>`**

**Arquivo:** `src/cli/commands/storage/buckets.ts`  
**Descrição:**

- Usa `AzionStorageProvider.ensureBucket(name)`.
- Em caso de já existir, informar e retornar o bucket.
- Output: tabela ou JSON (flag `--json`).

### - [x] **TCLI-STO-005 — Testes de buckets**

**Arquivo:** `tests/cli/storage/buckets.test.ts`  
**Descrição:**

- Mock de `AzionStorageProvider` para validar:
  - list imprime tabela/JSON
  - create chama ensureBucket e retorna dados.

## 🔐 Credenciais

### - [x] **TCLI-STO-006 — Criar provider/DTO para credentials**

**Arquivo:** `src/providers/azion/storage/credential.dto.ts` (novo)  
**Descrição:**

- Definir shape mínimo: `{ id?: string; name: string; type?: string; access_key?: string; secret_key?: string }`.

### - [x] **TCLI-STO-007 — Criar endpoints de credentials**

**Arquivo:** `src/providers/azion/http/endpoints.ts`  
**Descrição:**

- Adicionar `listCredentialsUrl`, `createCredentialUrl`.

### - [x] **TCLI-STO-008 — Implementar `AzionCredentialsProvider`**

**Arquivo:** `src/providers/azion/azion.credentials.ts` (novo)  
**Descrição:**

- Métodos: `listCredentials()`, `createCredential(input)`.
- Usar `AzionHttpClient` e endpoints de credentials.

### - [x] **TCLI-STO-009 — Criar comando `storage credentials list`**

**Arquivo:** `src/cli/commands/storage/credentials.ts`  
**Descrição:**

- Lista credenciais via provider.
- Output tabela + `--json`.

### - [x] **TCLI-STO-010 — Criar comando `storage credentials create`**

**Arquivo:** `src/cli/commands/storage/credentials.ts`  
**Descrição:**

- Flags: `--name <name> --type <type> --access-key <key> --secret-key <key>`
- Cria credencial via provider, imprime resultado.

### - [x] **TCLI-STO-011 — Testes de credenciais**

**Arquivo:** `tests/cli/storage/credentials.test.ts`  
**Descrição:**

- Mock provider; valida list/create com JSON e tabela.

## 🧭 Router/Help

### - [x] **TCLI-STO-012 — Atualizar router para incluir `storage`**

**Arquivo:** `src/cli/router.ts`  
**Descrição:**

- Adicionar comando `storage` com subcomandos `buckets` e `credentials`.

### - [x] **TCLI-STO-013 — Atualizar help com comandos de storage**

**Arquivo:** `src/cli/commands/help.ts`  
**Descrição:**

- Incluir exemplos e flags relevantes (`--token`, `--json`).

## 📖 Docs/Tutoriais

### - [ ] **TCLI-STO-014 — Atualizar tutoriais de bucket/credencial**

**Arquivo:** `docs/tutorials/create-bucket.md`, `docs/tutorials/create-credential.md`  
**Descrição:**

- Ajustar para refletir comandos CLI de buckets/credentials assim que implementados.
