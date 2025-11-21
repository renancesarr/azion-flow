# Tasks — UX da CLI (azion-flow)

Esta fase transforma a CLI em uma experiência profissional, fluida, elegante e coerente com o propósito do azion-flow.  
Aqui nasce a “alma” visual da ferramenta — interação humana, feedbacks claros, cores, banners, tempos de execução, resumos e ergonomia.

Cada task é **atômica**, **precisa** e focada em criar uma CLI agradável para humanos e eficiente para IAs.

---

## 🎨 FASE 1 — Base de Estilo e Utilidades de Output

### - [ ] **TUX-001 — Criar utilitário de cores**

**Arquivo:** `src/cli/utils/colors.ts`  
**Descrição:**  
Criar helpers simples usando ANSI escapes, sem dependências externas:

- success()
- info()
- warn()
- error()
- highlight()  
  **Dependência:** TCLI-001

---

### - [ ] **TUX-002 — Criar renderer básico de seções**

**Arquivo:** `src/cli/utils/section.ts`  
**Descrição:**  
Criar helpers:

- section(title)
- subSection(title)
- divider()  
  **Dependência:** TCLI-001

---

### - [ ] **TUX-003 — Criar função de render de tabelas simples**

**Arquivo:** `src/cli/utils/table.ts`  
**Descrição:**  
Tabela sem libs externas, alinhamento básico.  
**Dependência:** TCLI-001

---

## 🚀 FASE 2 — Banner e Identidade

### - [ ] **TUX-004 — Criar banner do azion-flow**

**Arquivo:** `src/cli/banner.ts`  
**Descrição:**  
Texto estilizado, simples, sem ASCII art exagerada, mas com personalidade.  
Ex.:

```sh
azion-flow • static deploy on edge, simplified
```

**Dependência:** TUX-001

---

### - [ ] **TUX-005 — Mostrar banner em todos os comandos**

**Arquivo:** `src/cli/commands/*.ts`  
**Descrição:**  
Adicionar banner antes de qualquer execução.  
**Dependência:** TUX-004

---

## 📦 FASE 3 — UX do Comando “deploy”

### - [ ] **TUX-006 — Criar loading minimalista para cada step**

**Arquivo:** `src/cli/utils/loading.ts`  
**Descrição:**  
Exemplo:

```sh
→ Validando ambiente...
✓ Ambiente válido
```

Sem animação, apenas estados estáticos.  
**Dependência:** TUX-001

---

### - [ ] **TUX-007 — Integrar loading com orchestrator**

**Arquivo:** `deploy.orchestrator.ts`  
**Descrição:**

- Antes de cada step: imprimir “→ StepName…”
- Após sucesso: “✓ StepName”
- Após erro: “✗ StepName”  
  **Dependência:** TDEP-REAL-002

---

### - [ ] **TUX-008 — Criar mapeamento step → nome amigável**

**Arquivo:** `src/cli/utils/step-labels.ts`  
**Descrição:**  
Exemplo:

- ValidateLocalEnvStep → “Validando ambiente”
- SyncFilesStep → “Sincronizando arquivos”  
  **Dependência:** TUX-007

---

### - [ ] **TUX-009 — Criar “deploy summary” final**

**Arquivo:** `src/cli/commands/deploy.ts`  
**Descrição:**  
Tabela contendo:

- bucket usado
- total de arquivos enviados
- aplicação usada
- domain configurado
- tempo total  
  **Dependência:** TUX-003, TDEP-REAL-007

---

## 🔧 FASE 4 — Flags, Output e Formatos Avançados

### - [ ] **TUX-010 — Implementar flag `--json`**

**Descrição:**  
Retorna JSON puro sem estilização.  
**Dependência:** TDEP-REAL-011

---

### - [ ] **TUX-011 — Implementar flag `--silent`**

**Descrição:**  
Não imprime steps, somente resultado final.  
**Dependência:** TDEP-REAL-011

---

### - [ ] **TUX-012 — Implementar flag `--debug`**

**Descrição:**  
Mostra logs internos do orchestrator.  
**Dependência:** TDEP-REAL-008

---

### - [ ] **TUX-013 — Implementar flag `--no-color`**

**Descrição:**  
Desativa cores.  
**Dependência:** TUX-001

---

## 🧭 FASE 5 — Qualidade de Vida (QoL)

### - [ ] **TUX-014 — Criar mensagem de erro universal amigável**

**Arquivo:** `src/cli/utils/errors.ts`  
**Descrição:**  
Transformar erros técnicos em mensagens curtas e claras.  
**Dependência:** TDEP-REAL-003

---

### - [ ] **TUX-015 — Criar seção “como resolver” para erros comuns**

**Descrição:**  
Se erro for de bucket → sugerir verificar token, permissões, nome  
Se erro for de domínio → sugerir checar DNS  
Etc.  
**Dependência:** TUX-014

---

### - [ ] **TUX-016 — Criar ajuda CLI (`--help`)**

**Arquivo:** `src/cli/help.ts`  
**Descrição:**  
Listar comandos, flags, e exemplos reais.  
**Dependência:** TCLI-005

---

## 🧪 FASE 6 — Testes de UX

### - [ ] **TUX-017 — Testar CLI com mock do orchestrator**

**Arquivo:** `tests/cli/ux/basic.test.ts`  
Testar:

- banner exibido
- labels corretas
- flow básico sem erros

---

### - [ ] **TUX-018 — Testar JSON mode**

Arquivo: `tests/cli/ux/json.test.ts`

---

### - [ ] **TUX-019 — Testar silent mode**

Arquivo: `tests/cli/ux/silent.test.ts`

---

### - [ ] **TUX-020 — Testar no-color mode**

Arquivo: `tests/cli/ux/nocolor.test.ts`

---

### - [ ] **TUX-021 — Testar help**

Arquivo: `tests/cli/ux/help.test.ts`

---

## 🎯 FINAL

Ao terminar esta fase teremos:

- uma CLI elegante, clara e profissional
- experiência humana agradável e bem estruturada
- flags que cobrem todos os modos de uso
- output consistente, rastreável e limpo
- testes garantindo UX estável
- azion-flow pronto para ser utilizado por qualquer pessoa

Próximas fases naturais:

🔥 tasks de preparação para release (npm + GitHub Releases)  
🔥 tasks finais de documentação  
🔥 tasks de exemplos e templates de deploy
