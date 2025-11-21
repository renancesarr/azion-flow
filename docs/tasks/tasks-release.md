# Tasks — Release & Distribution (azion-flow)

Esta fase transforma o azion-flow de um projeto funcional em um **produto publicável e distribuível**, pronto para ser usado por qualquer dev.  
Aqui cuidamos de versionamento, empacotamento, distribuição, CI/CD e validações de release.

Tudo é **cirúrgico, granular e seguro** — sem passos escondidos.

---

## 🧭 FASE 1 — Versionamento e Preparação

### - [ ] **TREL-001 — Criar CHANGELOG.md inicial**

**Descrição:**

- Criar estrutura de CHANGELOG seguindo padrão keep-a-changelog
- Inserir “Unreleased” + primeiras categorias  
  **Dependência:** Docs completas

---

### - [ ] **TREL-002 — Criar VERSION file**

**Descrição:**  
Arquivo simples contendo versão semântica atual (`0.1.0`).  
**Dependência:** Nenhuma

---

### - [ ] **TREL-003 — Implementar script automático update-version**

**Arquivo:** `scripts/update-version.ts`  
**Descrição:**

- recebe nova versão
- atualiza package.json
- atualiza VERSION
- cria entrada no CHANGELOG  
  **Testes:**
- update patch
- update minor
- update major

---

## 📦 FASE 2 — Empacotamento NPM

### - [ ] **TREL-004 — Criar script de build de release (`build:release`)**

**Descrição:**

- gerar apenas arquivos necessários (`dist/`)
- remover testes e dev artefacts  
  **Dependência:** build funcional

---

### - [ ] **TREL-005 — Criar .npmignore**

Conteúdo mínimo:

```dir
src/
tests/
docs/
scripts/
*.md
!README.md
```

---

### - [ ] **TREL-006 — Adicionar campo “bin” no package.json**

Exemplo:

```json
"bin": {
  "azion-flow": "./dist/cli/index.js"
}
```

---

### - [ ] **TREL-007 — Implementar validação pós-build**

Criar script: `scripts/validate-release.ts`  
Valida:

- dist existe
- cli roda
- comando `azion-flow --help` funciona

---

## 🚀 FASE 3 — Publicação no NPM

### - [ ] **TREL-008 — Criar script `npm:publish`**

- roda build
- roda validate
- executa `npm publish --access public`

---

### - [ ] **TREL-009 — Criar dry-run de publish**

`npm publish --dry-run`  
Integrado no pipeline do GitHub.

---

## 🔄 FASE 4 — GitHub Release Automático

### - [ ] **TREL-010 — Criar GitHub Workflow: release.yml**

Triggers:

- tag `v*.*.*`

Stages:

1. build
2. validate
3. npm publish
4. gerar release no GitHub
5. anexar CHANGELOG parcial

---

### - [ ] **TREL-011 — Criar GitHub Workflow: test.yml**

Executa em:

- push
- PR

Steps:

- instalar
- buildar
- rodar testes
- coverage

---

### - [ ] **TREL-012 — Criar GitHub Workflow: lint.yml**

Executa lint + markdownlint + commitlint.

---

## 📚 FASE 5 — Documentação final para Release

### - [ ] **TREL-013 — Criar README de produto**

Inclui:

- instalação
- uso básico
- exemplos
- screenshots da CLI
- troubleshooting
- roadmap

---

### - [ ] **TREL-014 — Criar pasta examples/**

Com exemplos reais de:

- deploy simples
- deploy de múltiplas pastas
- config customizada
- domínio customizado

---

### - [ ] **TREL-015 — Criar guia “Como contribuir”**

Arquivo: `CONTRIBUTING.md`  
Inclui:

- setup do ambiente
- regras de commit
- estrutura do projeto
- como rodar testes
- como rodar CLI em modo dev

---

## 🔒 FASE 6 — Verificações de Qualidade e Segurança

### - [ ] **TREL-016 — Rodar `npm audit` e corrigir vulnerabilidades**

---

### - [ ] **TREL-017 — Adicionar dependabot.yml**

Atualizações automáticas de deps.

---

### - [ ] **TREL-018 — Adicionar licença final (MIT)**

Garantir permissões claras.

---

## 🎯 FINAL — Após concluir esta fase, teremos

✔ versão semântica controlada  
✔ npm package empacotado corretamente  
✔ publish seguro (com dry-run)  
✔ workflow de release automático  
✔ documentação profissional  
✔ examples  
✔ testes no CI  
✔ licenciamento  
✔ produto pronto para ser usado no mundo real

O azion-flow nasce como **produto público**.
