# Philosophy

## Visão Geral

Este documento apresenta a fundação conceitual, estratégica e técnica do **azion-flow** — uma CLI projetada para transformar o processo de deploy na Azion em um fluxo simples, direto e acessível. Aqui descrevemos os problemas reais, as dores profundas dos usuários, o propósito da solução, e a lógica técnica que sustenta cada decisão.

Este guia é a bússola estratégica: tudo nasce aqui.

---

## Design Thinking — Aprofundando o Problema

A Azion oferece uma infraestrutura de edge extremamente robusta. Porém, uma plataforma poderosa não significa uma plataforma fácil. A CLI e a UI/UX web deixam muito da desejar. Um dos grandes exemplos que não é possível criar um azion storage bucket pela ui/ux web.

### As dores reais — ampliadas e aprofundadas

#### **1. Deploy manual longo e fragmentado**

O fluxo típico exige:

* acessar painel
* criar bucket
* configurar permissões
* fazer upload manual
* criar aplicação
* configurar domínios
* ajustar edge settings
* validar deploy

Esse processo se repete para cada projeto, landing ou microsite.

**Dores:**

* repetição desgastante
* alto risco de erro humano
* tempo perdido com tarefas que não agregam valor

---

#### **2. Ferramentas oficiais com curva de aprendizado alta**

A CLI oficial, embora completa, não é intuitiva e exige conhecimento profundo da plataforma. Já o bot de tutoriais automatizados não gera fluxos claros ou replicáveis.

**Dores:**

* documentação fragmentada
* comandos extensos e complexos
* tutoriais genéricos que não resolvem casos reais
* falta de orientação prática

---

#### **3. Onboarding difícil para iniciantes**

Mesmo para quem entende build estático, o salto para edge deployment é enorme.

**Dores:**

* desconhecimento de termos técnicos
* medo de configurar DNS
* receio de “quebrar” algo
* insegurança ao lidar com APIs

No Brasil — onde a maioria dos criadores ainda depende de Hostinger/UOLHost/HostGator — a transição para uma plataforma avançada é quase impossível sem auxílio.

---

#### **4. Falta de automação integrada**

A API é poderosa, mas poucos sabem utilizá-la. A ausência de uma interface simples, orientada a tarefas, faz com que devs experientes também sintam fricção.

**Dores:**

* ausência de pipelines nativos
* builds independentes do deploy
* necessidade de scripts próprios
* retrabalho constante

---

#### **5. Edge Computing sem acessibilidade real**

A Azion é rápida e distribuída — porém inacessível para quem busca simplicidade.

**Dores:**

* performance disponível, mas subutilizada
* empresas pequenas desconhecem o potencial
* devs individuais preferem opções mais simples e globais

---

## Os 5W – Expandidos e Técnicos

### **1. What — O que estamos construindo?**

Uma CLI estruturada em módulos independentes:

* **bucket-service** (criação, listagem, upload, limpeza)
* **application-service** (criação, update, rotas)
* **dns-service** (setup e validação de domínio)
* **deploy-service** (pipeline completo)
* **diagnostics** (logs, erros, validações automáticas)

Tudo construído sobre:

* Node.js
* TypeScript
* API Azion v4

---

### **2. Why — Por que isso importa?**

Porque o ecossistema de edge computing só cresce quando se torna acessível. Ferramentas simples ampliam adoção. A experiência importa tanto quanto a tecnologia.

**Razões técnicas e estratégicas:**

* melhora a produtividade de equipes
* reduz erros em ambientes críticos
* padroniza deploys
* permite integração futura com CI/CD
* abre caminho para automações avançadas

---

### **3. Who — Para quem estamos fazendo?**

Expansão dos públicos-alvo:

* desenvolvedores independentes
* squads de front-end
* equipes de marketing que precisam publicar LPs rapidamente
* freelancers de landing pages
* criadores de site pessoal
* designers que usam (Figma → Export → Deploy)
* qualquer pessoa que precise de publicação rápida sem complexidade

---

### **4. When — Quando essa solução é utilizada?**

* deploy inicial de projetos
* atualizações rápidas
* correções emergenciais
* automações via scripts do usuário
* pipelines CI/CD
* publicações sem servidor

A CLI precisa funcionar bem tanto no uso manual quanto no uso automatizado.

---

### **5. Where — Onde essa solução se encaixa?**

No fluxo total:

```txt
Design → Desenvolvimento → Build → Deploy → Publicação → Monitoração
```

O azion-flow atua firmemente em:

* Build → Deploy → Publicação
  E futuramente poderá ajudar em monitoração e diagnósticos.

---

## Caminho Até a Solução Estratégica (Aprofundado)

O design estratégico do **azion-flow** precisa ser mais que bonito no papel — ele deve ser **palpável**, **executável**, **real**. Os pilares abaixo foram redefinidos para refletir decisões concretas que moldam o produto e o tornam possível na prática.

---

## Design Estratégico — Pilares Reais e Aplicáveis

### **1. Fluxo de Uso Natural (Flow-Oriented Design)**

A CLI deve permitir que qualquer pessoa execute um deploy completo sem consultar documentação.
O fluxo será sempre:

```txt
ação → confirmação → execução → feedback
```

Nada de comandos escondidos, nada de ambiguidades.

---

### **2. Redução de Atrito Cognitivo**

Toda decisão do projeto deve reduzir esforço mental:

* nomes de comandos coerentes
* respostas curtas e diretas
* sugestões automáticas
* erros que expliquem a causa e a solução

A mente do usuário deve ficar livre para criar — não para memorizar.

---

### **3. Modularidade Extensível (Arquitetura Respirável)**

Divisão clara em módulos:

* `bucket-service`
* `application-service`
* `dns-service`
* `deploy-service`
* `diagnostics`

Cada um isolado, testável e substituível.
Isso garante evolução sem colapsar o todo.

---

### **4. Automatização de Tarefas Repetitivas**

Operações comuns devem ser executáveis em um comando:

* criar bucket
* upload de arquivos
* configurar app
* apontar domínio

O usuário não deve repetir processos que a máquina pode repetir melhor.

---

### **5. Adoção Real de Edge Computing**

Não basta usar a Azion — é preciso **usar bem**.

A CLI deve:

* escolher configurações ideais automaticamente
* validar comportamento
* sugerir otimizações
* aproveitar o edge brasileiro

O propósito é democratizar performance.

---

### **6. Documentação Sustentada por Humanos e IAs**

Toda escrita é pensada para:

* orientar desenvolvedores reais
* permitir que IAs colaborem na evolução

Documentos modulares facilitam manutenção no longo prazo.

---

### **7. Simplicidade como Estratégia Central**

A simplicidade aqui não é estética —
é **eficiência operacional**.

Menos passos ⇒ menos erros ⇒ mais adoção.

---

### **8. Confiabilidade Inabalável**

Cada comando precisa funcionar. Sempre.

* validações prévias automáticas
* prevenção de estados quebrados
* mensagens de erro orientadas

Usuários só confiam em ferramentas que não os traem.

---

### **9. Transparência Operacional Real**

Informações claras sempre:

* logs legíveis
* diagnósticos diretos
* sugestões de solução
* indicadores de progresso

O usuário entende o que está acontecendo de verdade.

---

### **10. Inclusão de Diferentes Níveis Técnicos**

Do iniciante ao arquiteto, todos precisam conseguir usar.

* configurações guiadas
* defaults inteligentes
* comandos avançados opcionais

A barreira de entrada deve desaparecer.

---

### **11. Clareza Narrativa e Comunicação Humana**

A linguagem deve ser técnica, mas não desumana.
Evitar corporativês, evitar jargão desnecessário.

O projeto conversa com gente.

---

### **12. Poética Funcional — a Elegância do Útil**

Não buscamos ser só eficientes — buscamos ser **bonitos de usar**.
Fluxos intuitivos, mensagens limpas, decisões elegantes.

Ferramentas boas desaparecem — mas deixam a sensação de que tudo ficou mais leve.

---

### **13. Crescimento Saudável e Evolução Guiada**

Adicionar apenas o necessário, quando necessário.
Evitar complexidade acidental.

---

### **14. Sustentabilidade Técnica (Escolhas que Duram)**

* Node.js + TypeScript pela maturidade
* padrões consolidados (SOLID, CQS)
* modularidade para adaptação futura

Nada de padrões frágeis que viram problema amanhã.

---

### **15. Documentação Viva**

A documentação cresce com o projeto.
Tudo modular, editável e claro.

---

## Benefícios Diretos — Aprofundados

* Deploys 10x mais rápidos
* Redução de erros humanos
* Automação sem aprendizagem pesada
* Onboarding claro para novos devs
* Padronização em squads e freelancers
* Integração futura com CI/CD
* Aproveitamento total do edge brasileiro (Azion)

---

## Benefícios Indiretos — Expandidos

* democratização do edge computing
* incentivo a desenvolvedores brasileiros
* alternativa real a Hostinger/UOLHost
* substituto natural para Github Pages e Vercel em sites estáticos
* adoção orgânica em comunidades tech
* potencial de virar produto comercial
* redução da dependência de plataformas estrangeiras

---

## Princípios de Engenharia

Para reforçar a coerência técnica e garantir longevidade arquitetural, o **azion-flow** adota princípios consolidados de engenharia de software:

### **KISS (Keep It Simple, Stupid)**

A CLI deve ser simples de entender, simples de usar e simples de manter.
Nada de overengineering. Nada de camadas desnecessárias.

### **SOLID**

Aplicado especialmente aos serviços internos:

* **S** – cada módulo faz uma coisa só (ex: bucket-service, dns-service)
* **O** – aberto para expansão, fechado para modificação
* **L** – substituição segura de implementações
* **I** – interfaces específicas para cada responsabilidade
* **D** – dependências sempre abstraídas

### **CQS (Command Query Separation)**

Comandos (ex: criar bucket) não retornam dados significativos.
Consultas (ex: listar buckets) não alteram estado.
Isso facilita testes, previsibilidade e clareza.

### **Fail Fast**

Erros precisam ocorrer cedo, com mensagens claras, evitando estados quebrados.

### **Idempotência**

Operações repetidas devem gerar o mesmo resultado quando possível (ex: configurar domínio).

### **Transparência Operacional**

Logs claros, diagnósticos legíveis e feedback imediato ao usuário.

---

## Filosofia Central (Versão Técnica + Poética)

## "Abstrair o complexo, entregar o poder, remover a fricção."

O azion-flow existe para fazer a tecnologia desaparecer —
para que o usuário publique conteúdo sem sentir o peso da infraestrutura.

A filosofia é:

* simplicidade
* velocidade
* precisão
* fluidez
* autonomia

---

Este documento é a âncora estratégica do projeto. Qualquer nova funcionalidade, módulo ou decisão deve respeitar a visão aqui definida.
