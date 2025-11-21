# Tasks — Implementação da CLI (azion-flow)

Estas tasks definem a criação da CLI do projeto de forma **atômica, granular e sequencial**, seguindo a arquitetura e stack já aprovadas.

Nenhuma lógica de negócio será implementada aqui — apenas a base estrutural da CLI.

---

## ⚡ FASE: Configuração e EntryPoint da CLI

### - [ ] **TCLI-001 — Criar arquivo `bin/azion-flow`**

**Descrição:**  
Criar o arquivo executável principal da CLI no diretório `bin/`.  
Conteúdo inicial:

```sh
#!/usr/bin/env node
import("../dist/cli/index.js");
```

Marcar o arquivo como executável.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Verificar que o arquivo existe
- Verificar permissões de execução (`chmod +x`)  
  **Dependência:** TSTR-002, TSTR-003

---

### - [ ] **TCLI-002 — Adicionar campo `bin` no `package.json`**

**Descrição:**  
Adicionar:

```json
"bin": {
  "azion-flow": "./bin/azion-flow"
}
```

Permite rodar a CLI globalmente via `npx azion-flow`.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Executar `npx azion-flow` chama o entrypoint  
  **Dependência:** TCLI-001

---

### - [ ] **TCLI-003 — Criar arquivo `src/cli/bootstrap.ts`**

**Descrição:**  
Criar arquivo responsável por:

- carregar configurações globais futuras
- inicializar logger (ainda vazio)
- preparar ambiente para executar comandos  
  O arquivo começa vazio com apenas a função `bootstrap()`.  
  **RFs:** null  
  **NRFs:** RNF-001  
  **Testes Unitários:**
- Arquivo existe  
  **Dependência:** TSTR-003

---

### - [ ] **TCLI-004 — Ajustar `src/cli/index.ts` para usar bootstrap**

**Descrição:**  
Adicionar conteúdo mínimo:

```ts
import { bootstrap } from "./bootstrap";

async function main() {
  await bootstrap();
}

main();
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Rodar `node dist/cli/index.js` não deve gerar erro  
  **Dependência:** TCLI-003

---

## ⚡ FASE: Sistema de Comandos da CLI

### - [ ] **TCLI-005 — Criar diretório `src/cli/commands/`**

**Descrição:**  
Criar pasta onde comandos individuais serão armazenados.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Pasta existe  
  **Dependência:** TSTR-002

---

### - [ ] **TCLI-006 — Criar `src/cli/commands/help.ts` (comando vazio)**

**Descrição:**  
Criar arquivo com função:

```ts
export function helpCommand() {}
```

Sem lógica ainda.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCLI-005

---

### - [ ] **TCLI-007 — Criar `src/cli/commands/version.ts`**

**Descrição:**  
Arquivo com função vazia para exibir versão futuramente.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCLI-005

---

### - [ ] **TCLI-008 — Criar roteador central `src/cli/router.ts`**

**Descrição:**  
Criar arquivo com função vazia:

```ts
export function routeCommand(args: string[]) {}
```

Responsável futuramente por rotear comandos.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCLI-005

---

### - [ ] **TCLI-009 — Ligar router ao `index.ts`**

**Descrição:**  
Adicionar em `index.ts`:

```ts
import { routeCommand } from "./router";

async function main() {
  await bootstrap();
  const args = process.argv.slice(2);
  await routeCommand(args);
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- `node dist/cli/index.js help` não quebra  
  **Dependência:** TCLI-008

---

## ⚡ FASE: Tipos e Interfaces da CLI

### - [ ] **TCLI-010 — Criar `src/cli/types/`**

**Descrição:**  
Criar diretório para tipos específicos da CLI.  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:**

- Pasta existe  
  **Dependência:** TSTR-002

---

### - [ ] **TCLI-011 — Criar `src/cli/types/command.ts`**

**Descrição:**  
Criar interface inicial:

```ts
export interface CLICommand {
  name: string;
  run(args: string[]): Promise<void>;
}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCLI-010

---

## ⚡ FASE: Estrutura de Mensagens e Saída

### - [ ] **TCLI-012 — Criar `src/cli/ui/`**

**Descrição:**  
Criar pasta para output da CLI (print, cores, banners).  
**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Pasta existe  
**Dependência:** TSTR-002

---

### - [ ] **TCLI-013 — Criar arquivo `src/cli/ui/output.ts`**

**Descrição:**  
Criar funções vazias:

```ts
export function print() {}
export function printError() {}
export function printSuccess() {}
```

**RFs:** null  
**NRFs:** RNF-001  
**Testes Unitários:** Arquivo existe  
**Dependência:** TCLI-012

---

## ⚡ FASE: Testes Iniciais da CLI

### - [ ] **TCLI-014 — Criar teste de smoke para entrypoint**

**Descrição:**  
Criar arquivo `tests/cli/entrypoint.test.ts` com:

```ts
import { describe, it, expect } from "vitest";

describe("CLI Entrypoint", () => {
  it("should import without crashing", async () => {
    const mod = await import("../../src/cli/index.ts");
    expect(mod).toBeDefined();
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:**

- Teste deve passar  
  **Dependência:** TCLI-004

---

### - [ ] **TCLI-015 — Criar teste de smoke do router**

**Descrição:**  
Criar arquivo `tests/cli/router.test.ts` com:

```ts
import { describe, it, expect } from "vitest";
import { routeCommand } from "../../src/cli/router";

describe("CLI Router", () => {
  it("should not throw when called with empty args", async () => {
    await routeCommand([]);
  });
});
```

**RFs:** null  
**NRFs:** RNF-004  
**Testes Unitários:**

- Teste deve passar  
  **Dependência:** TCLI-009

---

## 🔚 Final da Fase CLI Base

Com essas tasks completas, teremos:

- estrutura da CLI
- entrypoint funcional
- roteamento básico (ainda vazio)
- suporte para comandos
- sistema de mensagens
- testes de smoke

Tudo pronto para evoluir para:

🔥 comandos reais  
🔥 providers  
🔥 domínio  
🔥 casos de uso  
🔥 steps do deploy
