# Philosophy

Documento base, técnico e direto. Este arquivo define **o problema real**, **o objetivo estratégico**, **as dores concretas**, **o que será feito agora** e **o que pode vir depois**. Nada além disso.

---

## 1. Contexto Atual

Hoje o processo de deploy de web sites estático na Azion é manual, fragmentado e pouco fluido. Mesmo com infraestrutura forte, o fluxo exige que o usuário pule entre:

* painel da Azion,
* CLI oficial complexa,
* documentação extensa,
* APIs pouco acessíveis para iniciantes,
* processos repetitivos (bucket → upload → app → domínio).

Criadores de sites estáticos/ landingpages — especialmente no cenário brasileiro — buscam algo simples, direto e sem burocracia. Ferramentas populares (Hostinger, GitHub Pages, Vercel) funcionam porque **reduzem o atrito**.

A Azion oferece performance.
O **azion-flow** oferece fluidez.

---

## 2. Visão Geral

### 2.1 Problema

O fluxo atual de deploy na Azion é:

* manual,
* lento,
* pouco intuitivo,
* fácil de errar,
* e sem automações diretas para páginas estáticas.

Para sites simples, o processo é mais complicado do que deveria ser.

### 2.2 Objetivo Estratégico

Criar uma **CLI modular e confiável** que automatiza o deploy estático na Azion com o mínimo de esforço humano.

Objetivo real:

* reduzir passos manuais,
* padronizar rotinas de deploy,
* evitar erros repetitivos,
* simplificar a vida de quem publica páginas estáticas.

Mais simples, mais rápido, mais previsível.

---

## 3. Problemas Reais

Abaixo, somente dores concretas — nada abstrato.

* Processo de deploy exige muitos passos separados.
* Criar e configurar bucket é manual.
* Upload/sincronização é manual.
* Criar application e presets exige repetição.
* Configurar domínio demanda vários cliques.
* A CLI oficial é extensa e pouco amigável.
* A API é poderosa, mas não intuitiva.
* Falta ferramenta simples para fluxo completo.
* Falta documentação aplicada ao caso "deploy simples".
* Alta chance de erro humano por repetição.

Essas são as dores que o projeto resolve. Somente elas.

---

## 4. Como Resolvemos

O **azion-flow** entrega:

* **CLI única** para o fluxo completo.
* **Automação total** de:

  * criação/validação de bucket,
  * upload/sync de arquivos,
  * criação/atualização de application,
  * configuração opcional de domínio.
* **Feedbacks claros** (erros e sucessos).
* **Config local simples** (token + defaults).
* **Fluxo padronizado** que reduz riscos.
* **Base modular** para evoluir sem quebrar.

Nada além do necessário.

---

## 5. Resultados Esperados (Concretos)

Somente o que pode ser percebido e medido.

* Deploy com menos ações manuais.
* Redução de erros por repetição.
* Fluxo reproduzível e previsível.
* Configuração clara e fácil de entender.
* Menos uso do painel da Azion para tarefas básicas.
* Processo mais rápido de ponta a ponta (sem estimativas fantasiosas).
* Projeto documentado de forma modular e utilitária.

Não prometemos velocidade absoluta ou milagre.
Prometemos **eficiência e simplicidade real**.

---

## 6. Escopo Inicial (Realista)

### 6.1 O que faz parte agora

* Deploy de site estático.
* Criação/validação de bucket.
* Upload e sincronização.
* Criação de application padrão.
* Configuração opcional de domínio.
* Diagnóstico final simples.
* Config local minimalista.
* Logs diretos.
  