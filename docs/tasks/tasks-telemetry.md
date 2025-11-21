# Tasks — Telemetria Opcional (azion-flow)

A telemetria aqui é **100% opcional**, **respeitosa**, **anônima** e sempre **opt‑in**.  
Ela serve para melhorar DX, entender problemas e evoluir a ferramenta — sem nunca comprometer privacidade.

As tasks abaixo seguem granularidade máxima.

---

## 🔐 FASE 1 — Opt‑in / Opt‑out (Privacidade Primeiro)

### - [ ] **TTEL-001 — Criar verificação de opt‑in**

**Arquivo:** `src/telemetry/telemetry.optin.ts`  
**Descrição:**

- Criar função `isTelemetryEnabled()`
- Retorna true somente se:
  - existir arquivo `.azionflow/telemetry.json` com `{ enabled: true }`
  - ou variável `AZION_FLOW_TELEMETRY=1`  
    **Dependência:** nenhuma

---

### - [ ] **TTEL-002 — Criar comando CLI “telemetry enable/disable”**

**Arquivo:** `src/cli/commands/telemetry.ts`  
**Descrição:**  
Comandos:

- `azion-flow telemetry enable`
- `azion-flow telemetry disable`  
  Grava `.azionflow/telemetry.json`.  
  **Dependência:** TTEL-001

---

### - [ ] **TTEL-003 — Criar aviso inicial opcional (uma única vez)**

**Arquivo:** `startup.ts`  
**Descrição:**

- Mostrar aviso curto:  
  "Deseja ativar telemetria anônima? (y/n)"
- Apenas na primeira execução  
  **Dependência:** TTEL-002

---

## 📦 FASE 2 — Coleta Local (sem envio)

### - [ ] **TTEL-004 — Criar estrutura de evento**

**Arquivo:** `src/telemetry/event.ts`  
**Descrição:**  
Interface:

```ts
type TelemetryEvent = {
  event: string;
  timestamp: string;
  version: string;
  os: string;
  node: string;
  payload?: Record<string, any>;
};
```

**Dependência:** nenhuma

---

### - [ ] **TTEL-005 — Criar função `createEvent(event, payload)`**

**Arquivo:** `src/telemetry/create-event.ts`  
**Descrição:**

- Preenche TelemetryEvent
- Coleta apenas metadados técnicos (não pessoais)  
  **Dependência:** TTEL-004

---

### - [ ] **TTEL-006 — Criar buffer de eventos em arquivo local**

**Arquivo:** `src/telemetry/buffer.ts`  
**Descrição:**

- Gravar eventos em `.azionflow/events.log`
- Append JSON lines  
  **Dependência:** TTEL-005

---

## 🚀 FASE 3 — Envio Opcional

### - [ ] **TTEL-007 — Criar função `sendEvents()`**

**Arquivo:** `src/telemetry/send.ts`  
**Descrição:**

- Ler events.log
- Enviar para endpoint remoto configurável
- Deletar somente se envio OK  
  **Dependência:** TTEL-006

---

### - [ ] **TTEL-008 — Integrar envio nos comandos**

**Arquivo:** `deploy.usecase.ts`  
**Descrição:**

- Após deploy → enviar `deploy_finished`
- Em caso de erro → enviar `deploy_error`  
  **Dependência:** TTEL-007

---

## 🧭 FASE 4 — Tipos de Eventos

### - [ ] **TTEL-009 — Criar lista inicial de eventos**

**Arquivo:** `src/telemetry/events.ts`  
Eventos:

- cli_started
- deploy_started
- deploy_finished
- deploy_error
- config_loaded
- steps_executed  
  **Dependência:** TTEL-005

---

### - [ ] **TTEL-010 — Criar wrappers específicos**

**Arquivo:** `src/telemetry/events/*.ts`  
Exemplo:  
`logDeployStart(context)`  
`logConfigLoaded()`  
**Dependência:** TTEL-009

---

## 🧪 FASE 5 — Testes

### - [ ] **TTEL-011 — Testar opt‑in/opt‑out**

Arquivo: `tests/telemetry/optin.test.ts`

---

### - [ ] **TTEL-012 — Testar criação de eventos**

Arquivo: `tests/telemetry/create-event.test.ts`

---

### - [ ] **TTEL-013 — Testar buffer local**

Arquivo: `tests/telemetry/buffer.test.ts`

---

### - [ ] **TTEL-014 — Testar envio**

Mock de endpoint remoto.  
Arquivo: `tests/telemetry/send.test.ts`

---

## 🎯 FINAL

Ao concluir esta fase teremos:

✔ Telemetria 100% opt‑in  
✔ Sem dados pessoais  
✔ Eventos locais persistentes  
✔ Envio para endpoint remoto opcional  
✔ Testes cobrindo coleta, buffer e envio  
✔ CLI profissional com diagnóstico real

Próximos passos opcionais:

🔥 dashboard interno  
🔥 compressão de logs  
🔥 grouping inteligente de eventos
