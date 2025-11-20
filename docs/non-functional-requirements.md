# Requisitos Não Funcionais — azion-flow

(Organizados segundo categorias IEEE)

---

## 1. Performance Requirements

### PR-001 — Tempo de Resposta Adequado

O CLI deve executar operações dentro de um tempo aceitável para uso interativo.

Racionais:

- não é um produto de tempo real
- não há metas específicas nesta fase
- objetivo é evitar travamentos ou esperas desnecessárias

Critérios:

- nenhuma operação deve parecer “congelada”
- upload deve exibir progresso ou feedback mínimo
- operações longas devem informar ao usuário o que está acontecendo

### PR-002 — Economia de Recursos

O CLI deve evitar consumo excessivo de memória ou uso de CPU.

Critérios:

- evitar carregamento desnecessário de arquivos
- evitar processamento redundante durante o upload
- não manter estruturas grandes na memória

---

## 2. Safety Requirements

(_Não é safety física — é safety lógica/sistêmica, como se aplica a software_)

### SR-001 — Estado Consistente

O deploy nunca deve deixar o sistema em estado parcialmente quebrado sem aviso.

Critérios:

- falhas interrompem a cadeia imediatamente
- contexto do erro deve ser informado
- nenhuma alteração parcial deve ficar invisível ao usuário

### SR-002 — Prevenção de Ações Irreversíveis Sem Contexto

A CLI não deve remover ou sobrescrever arquivos remotos sem que isso esteja claro.

Critérios:

- remoções devem ser opcionais
- mensagens devem indicar claramente impactos irreversíveis
- nunca existir “silent delete”

---

## 3. Security Requirements

### SEC-001 — Proteção do Token

O token do usuário não deve ser exposto em logs, erros ou saída do terminal.

Critérios:

- mascarar tokens automaticamente
- nunca imprimir valores sensíveis
- armazenar arquivo de config com permissões adequadas

### SEC-002 — Comunicação Segura

Toda comunicação com a Azion deve ser feita via HTTPS.

Critérios:

- rejeitar chamadas não seguras
- usar cliente HTTP com validação TLS padrão

### SEC-003 — Não Persistência de Informações Desnecessárias

A CLI não deve guardar dados que não sejam essenciais ao funcionamento.

Critérios:

- evitar caching excessivo
- armazenar apenas token + configs explícitas do usuário

---

## 4. Software Quality Attributes

### QA-001 — Confiabilidade

O sistema deve apresentar comportamento previsível e estável.

Critérios:

- códigos de saída consistentes
- mensagens de erro claras e estruturadas
- fluxo determinístico para o mesmo input

### QA-002 — Usabilidade (DX)

A CLI deve ser fácil de aprender e usar.

Critérios:

- comandos curtos e consistentes
- flags intuitivas
- help amigável

### QA-003 — Manutenibilidade

O código deve ser modular e fácil de evoluir.

Critérios:

- uso claro de padrões (Command, Strategy, Chain)
- arquivos pequenos e focados
- baixo acoplamento entre camadas

### QA-004 — Extensibilidade

A arquitetura deve suportar inclusão de novos serviços, comandos e etapas.

Critérios:

- adicionar um novo passo no fluxo não deve quebrar os existentes
- novas estratégias devem ser plugáveis sem refatorações grandes

### QA-005 — Portabilidade

O CLI deve funcionar em múltiplos SOs.

Critérios:

- evitar dependências específicas de sistema
- uso correto de paths multiplataforma

### QA-006 — Testabilidade

O sistema deve ser fácil de testar, com ou sem rede.

Critérios:

- abstração de HTTP via Ports/Adapters
- steps da Chain testáveis isoladamente
- estratégias mockáveis

### QA-007 — Robustez

O sistema deve resistir a condições inesperadas.

Critérios:

- erros de rede não devem travar o CLI
- timeouts devem ser tratados
- erros de permissão devem gerar mensagens claras

### QA-008 — Consistência

Mensagens, flags e estrutura do CLI devem seguir padrão único.

Critérios:

- nomenclatura interna uniforme
- estilo de logs consistente
- formato padronizado para erros

---

## 5. Business Rules

(Não são requisitos funcionais, mas definem propriedades de operação)

### BR-001 — Apenas Usuários com Token Válido Podem Executar Fluxos

Sem token válido, nenhum comando que interaja com a Azion deve funcionar.

### BR-002 — Deploy é Sempre Atômico por Diretório

O deploy só deve operar sobre um diretório de saída (ex: `dist/`).

### BR-003 — Nenhuma Ação Deve Ocorrer Sem Intenção Explícita

Nenhuma modificação na Azion deve acontecer sem comando direto ou flag clara.

### BR-004 — Domínio do Usuário é Sempre Opcional

Configurar domínio próprio nunca deve ser obrigatório para conclusão do deploy.

### BR-005 — Logs Devem Ser Sempre Legíveis por Humanos

Nada de logs obscuros, formato JSON bruto, ou ruído sem necessidade.

---
