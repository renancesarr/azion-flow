# Tasks — Fluxo FINAL do Deploy REAL (azion-flow)

Agora entramos na fase onde tudo converge:  
Providers reais → Services reais → Steps reais → **Fluxo de deploy REAL**.

Este é o núcleo do azion-flow:  
um orchestrator que executa todos os steps, valida resultados, lida com erros, constrói logs e retorna um relatório final de deploy.

As tasks abaixo são **cirúrgicas e altamente atômicas**.

---

## 🔥 FASE 1 — Orchestrator REAL

### - [ ] **TDEP-REAL-001 — Implementar criação REAL do DeployOrchestrator**

**Arquivo:** `src/usecases/deploy/deploy.orchestrator.ts`  
**Descrição:**  
Implementar construtor real:

- receber services
- receber providers
- receber pipeline (lista de steps)
- receber contexto inicial

**Testes:**

- instancia sem quebrar
- pipeline é armazenado corretamente

---

### - [ ] **TDEP-REAL-002 — Implementar método run() REAL (loop sequencial)**

**Descrição:**  
Implementação REAL do loop:

```ts
for (const Step of this.steps) {
  const step = new Step(services, providers);
  await step.execute(context);
}
```

**Testes:**

- executa steps em ordem
- registra erros se step falhar

---

### - [ ] **TDEP-REAL-003 — Implementar captura de erros (error boundary por step)**

**Descrição:**  
Adicionar:

- try/catch ao redor de cada step
- salvar erro no report
- abortar fluxo se erro for crítico

**Testes:**

- step lança erro → fluxo interrompido
- erro registrado em context.report

---

## 🧩 FASE 2 — Pipeline REAL

### - [ ] **TDEP-REAL-004 — Atualizar DEPLOY_PIPELINE com steps reais**

**Arquivo:** `src/usecases/deploy/pipeline.ts`  
**Descrição:**  
Adicionar steps reais na ordem precisa:

1. ValidateLocalEnvStep
2. ReadConfigStep
3. ResolvePathsStep
4. ListBucketsStep
5. EnsureBucketStep
6. SyncFilesStep
7. ListApplicationsStep
8. SelectApplicationStep
9. GetDomainConfigStep
10. EnsureDomainStep
11. GenerateReportStep

**Testes:**

- pipeline exporta lista com length correto

---

### - [ ] **TDEP-REAL-005 — Validar ordem do pipeline (teste dedicado)**

**Arquivo:** `tests/usecases/pipeline-order.test.ts`  
**Descrição:**  
Verificar explicitamente que a ordem não muda.  
Evita bugs de regressão.

---

## 🧠 FASE 3 — Contexto REAL

### - [ ] **TDEP-REAL-006 — Implementar merge de contexto entre steps**

**Arquivo:** `deploy.orchestrator.ts`  
**Descrição:**  
Criar pequena função:

```ts
private mergeContext(partial) {
  Object.assign(this.context, partial)
}
```

**Testes:**

- merge simples
- merge profundo

---

### - [ ] **TDEP-REAL-007 — Exportar resultado final do deploy**

**Arquivo:** `deploy.usecase.ts`  
**Descrição:**  
Implementar retorno do use case:

```ts
return {
  success: true / false,
  report: context.report,
};
```

**Testes:**

- sucesso
- erro

---

## 📝 FASE 4 — Logs e Observabilidade (mínimo necessário)

### - [ ] **TDEP-REAL-008 — Implementar log por step (prefixado)**

**Arquivo:** `deploy.orchestrator.ts`  
**Descrição:**  
Criar função:

```ts
private log(msg: string) {
  if (process.env.AZION_FLOW_DEBUG) console.log(msg)
}
```

**Testes:**

- debug on → log chamado
- debug off → log ignorado

---

### - [ ] **TDEP-REAL-009 — Registrar tempo de execução por step**

**Descrição:**

- armazenar timestamp antes/depois
- registrar em `context.report.timings[stepName]`

**Testes:**

- map presente no relatório final

---

## 📦 FASE 5 — Integração REAL com a CLI

### - [ ] **TDEP-REAL-010 — Implementar comando CLI “deploy” REAL**

**Arquivo:** `src/cli/commands/deploy.ts`  
**Descrição:**

- instanciar use case
- executar run()
- imprimir status final
- imprimir relatório resumido

**Testes:**

- comando executa sem crash
- imprime saída (mock console.log)

---

### - [ ] **TDEP-REAL-011 — Implementar flags da CLI**

**Arquivo:** `deploy.ts`  
**Descrição:**  
Adicionar suporte:

- `--json` → retorna JSON raw
- `--debug` → habilita logs
- `--no-color` → desabilita cores

**Testes:**

- flag json → output json
- flag debug → logs ativados

---

## 🌎 FASE 6 — Testes Integrados REAIS (padrão ouro)

### - [ ] **TDEP-REAL-012 — Teste integrado REAl com mocks dos providers**

Arquivo: `tests/integration/deploy.real.test.ts`  
Fluxo completo:

1. validate
2. read config
3. resolve paths
4. buckets
5. application
6. domain
7. report

---

### - [ ] **TDEP-REAL-013 — Teste de fallback (quando faltam config, paths ou bucket)**

Arquivo: `tests/integration/deploy.fallback.test.ts`

---

### - [ ] **TDEP-REAL-014 — Teste de erro (simular provider quebrado)**

Arquivo: `tests/integration/deploy.error.test.ts`

---

## 🎯 FINAL

Ao concluir esta fase, teremos:

✔ Pipeline REAL  
✔ Orchestrator REAL  
✔ Contexto REAL  
✔ Logs REAIS  
✔ Steps REAIS funcionando  
✔ Deploy final executável  
✔ Integração CLI completa  
✔ Testes cobrindo fluxo inteiro

Isso faz o **azion-flow nascer oficialmente como ferramenta funcional**.

Próximas fases naturais:

🔥 UX da CLI (color, banners, loading, interações)  
🔥 Deploy performance tuning  
🔥 Versionamento e release npm  
🔥 Documentação final (READMEs, guias, examples)
