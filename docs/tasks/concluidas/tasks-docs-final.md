# Tasks — Documentação Final (azion-flow)

Agora documentamos o azion-flow como um **produto maduro**.  
A meta desta fase é entregar documentação clara, elegante e objetiva — útil tanto para humanos quanto para IAs que irão estender o projeto.

Cada task é atômica, direta e associada ao fluxo real do produto.

---

## 📘 FASE 1 — README Principal (Produto)

### - [x] **TDOC-001 — Criar README.md definitivo**

**Descrição:**  
O README principal deve conter:

- apresentação clara do azion-flow
- o que ele resolve (problema real)
- features principais
- instalação (`npm i -g azion-flow`)
- uso básico (`azion-flow deploy`)
- exemplos rápidos
- screenshot textual da CLI
- requisitos
- roadmap
- badges (npm version, build, license)

**RFs:** null  
**NRFs:** RNF-007 (Clareza, usabilidade)

---

## 📚 FASE 2 — Guia do Usuário (User Guide)

### - [x] **TDOC-002 — Criar guia de instalação**

Arquivo: `docs/user/install.md`  
Conteúdo:

- Node version
- Como instalar global
- Como atualizar
- Troubleshooting comuns

---

### - [x] **TDOC-003 — Criar guia de primeiros passos**

Arquivo: `docs/user/getting-started.md`  
Conteúdo:

- Criando pasta build
- Criando config mínima
- Executando deploy
- Interpretando o output

---

### - [x] **TDOC-004 — Criar guia de commands**

Arquivo: `docs/user/commands.md`  
Conteúdo:

- `deploy`
- flags (`--json`, `--debug`, `--silent`, `--no-color`)
- exemplos reais

---

## 🧠 FASE 3 — Guia de Arquitetura (para Devs)

### - [x] **TDOC-005 — Criar docs/architecture/overview.md**

Conteúdo:

- visão geral
- fluxo de informação
- onde estão services, steps, providers

---

### - [x] **TDOC-006 — Criar docs/architecture/execution-flow.md**

Conteúdo:

- pipeline real
- orchestrator
- contexto
- relatório final

---

### - [x] **TDOC-007 — Criar docs/architecture/providers.md**

Conteúdo:

- definição dos providers
- AzionHttpClient
- storage/app/domain providers
- decisões técnicas

---

### - [x] **TDOC-008 — Criar docs/architecture/services.md**

Conteúdo:

- bucket service
- filesync service
- domain service
- application service

---

### - [x] **TDOC-009 — Criar docs/architecture/cli.md**

Conteúdo:

- UX
- estrutura
- flags
- logs
- output

---

## 🛠️ FASE 4 — Guia de Contribuição

### - [x] **TDOC-010 — Criar CONTRIBUTING.md**

Conteúdo:

- como rodar local
- como rodar testes
- padrões de commit
- padrões de código
- fluxo para PR
- structure map

---

### - [x] **TDOC-011 — Criar CODE_OF_CONDUCT.md**

Modelo: Contributor Covenant

---

## 🧪 FASE 5 — Referência Técnica (Tech Reference)

### - [x] **TDOC-012 — Criar docs/reference/api.md**

Conteúdo:

- lista de funções públicas
- tipos expostos
- interfaces principais

---

### - [x] **TDOC-013 — Criar docs/reference/config.md**

Conteúdo:

- formato do config.json
- campos opcionais
- exemplos reais

---

### - [x] **TDOC-014 — Criar docs/reference/errors.md**

Conteúdo:

- erros comuns
- mensagens
- como resolver

---

## 📦 FASE 6 — Exemplos

### - [x] **TDOC-015 — Criar pasta examples/basic-deploy/**

**Descrição:**  
Exemplo mínimo com:

- index.html
- config.json
- passo a passo

---

### - [x] **TDOC-016 — Criar examples/multi-folder/**

**Descrição:**  
Deploy com múltiplas pastas / rotas

---

### - [x] **TDOC-017 — Criar examples/custom-domain/**

**Descrição:**  
Exemplo de domínio customizado

---

## 🧩 FASE 7 — Documentação para IAs (DX Automática)

### - [x] **TDOC-018 — Criar docs/ai/overview.md**

Conteúdo:

- como navegar o repo
- como entender o fluxo
- como gerar PRs automáticos

---

### - [x] **TDOC-019 — Criar docs/ai/prompts.md**

Conteúdo:

- prompts seguros para extensão
- prompts para correções
- prompts para geração de services/steps novos

---

## 🛡️ FASE 8 — Verificações e Qualidade

### - [x] **TDOC-020 — Rodar markdownlint e ajustar tudo**

---

### - [x] **TDOC-021 — Criar script validate-docs**

**Descrição:**  
Valida:

- links internos
- estrutura
- TOCs automáticas

---

## 🎯 FINAL

Ao concluir esta fase teremos:

✔ documentação humana completa  
✔ documentação técnica completa  
✔ documentação de arquitetura  
✔ documentação para contribuidores  
✔ exemplos completos  
✔ documentação para IAs  
✔ README corporativo e bonito  
✔ projeto pronto para onboarding de qualquer dev ou IA

Este é o último passo antes do azion-flow ser um produto **de nível profissional**.
