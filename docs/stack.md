# Stack — azion-flow (Desenvolvimento)

Este documento define a **stack oficial de desenvolvimento** do azion-flow.  
Ela foi projetada para ser estável, moderna, rápida, previsível e extremamente clara para humanos e IAs.

---

## 1. Runtime

### **Node.js LTS (20.x+)**

Motivos:

- suporta ESM nativamente
- compatível com TypeScript moderno
- excelente para CLIs
- performance estável
- ecossistema maduro

---

## 2. Linguagem

### **TypeScript — modo estrito**

Configurações essenciais do tsconfig:

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"moduleResolution": "bundler"`
- `"target": "ES2022"`
- `"module": "ESNext"`

Benefícios:

- segurança total do domínio
- melhor refatoração
- previsibilidade de tipos
- compatível com ESBuild/Vitest
- permite peça por peça ser testada e evoluída

---

## 3. Build / Bundling

### **tsup**

Escolha por ser:

- rápido
- zero configuração pesada
- suporta TS, dts, minificação e esm
- perfeito para bundling de CLI
- compatível com o ecossistema moderno

Comando sugerido:

```sh
tsup src/cli/index.ts --format esm --dts --minify --no-splitting --clean
```

---

## 4. Testes

A CLI exige três níveis de testes claros:

### **a) Unit Tests — Vitest**

Vitest foi escolhido porque:

- muito mais rápido que Jest
- suporta TS + ESM nativo
- API compatível com Jest
- watch instantâneo
- mocking moderno
- arquitetura leve e modular, ideal para steps
- perfeito para IA navegar e gerar testes

### **b) Integration Tests — Vitest + msw**

Usado para:

- testar use cases completos
- mockar HTTP da Azion
- testar providers fake
- validar cadeia completa de steps

### **c) E2E opcional — zx (Google)**

Para testar a CLI rodando de verdade:

- valida argumentos
- valida prompts
- valida fluxo real
- essencial quando o CLI crescer

---

## 5. Qualidade e Linting

### **ESLint**

Extensões recomendadas:

- eslint-config-standard-with-typescript
- eslint-plugin-import
- eslint-plugin-promise

### **Prettier**

Apenas para formatação — sem conflito com ESLint.

### **markdownlint**

Garante padronização dos arquivos `.md`.

---

## 6. Documentação

### **Markdown + Architecture Docs**

Nossa documentação é modular, clara e evolutiva.

Quando necessário, usaremos:

- **typedoc** para gerar docs automáticas do domínio.

---

## 7. DevOps

### Local

- `tsx --watch`
- `vitest --watch`
- `eslint --fix`

### CI/CD — GitHub Actions

- build
- test
- lint
- release automático

### Versionamento

#### **semantic-release**

- gera release
- cria changelog
- controla versão
- automatiza deploy da CLI (se publicado)

---

## 8. Convenções de Projeto

### Padrões de nome

- `*.service.ts`
- `*.entity.ts`
- `*.usecase.ts`
- `*.step.ts`
- `*.adapter.ts`
- `*.port.ts`

### Imports absolutos

```js
@core
@domain
@providers
@usecases
@cli
```

---

## 9. Resumo da Stack

✔ Node.js 20+  
✔ TypeScript strict  
✔ tsup  
✔ Vitest  
✔ msw  
✔ zx (opcional)  
✔ ESLint + Prettier + markdownlint  
✔ semantic-release  
✔ GitHub Actions  
✔ typedoc (opcional)

Stack simples, moderna e extremamente eficiente para CLI modular.
