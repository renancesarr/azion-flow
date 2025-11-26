# User Stories — azion-flow

Documento contendo as histórias de usuário da Fase 1, baseadas diretamente no `philosophy.md`, com identificação única em cada subtítulo para evitar conflitos de título (MD024) e melhorar rastreabilidade.

---

## US-001 — Deploy de site estático

### US-001 — Descritivo

Como **desenvolvedor de páginas estáticas**,  
eu quero **realizar um deploy completo com um único comando**,  
para que **eu não precise repetir manualmente os passos de bucket, upload e aplicação**.

### US-001 — Critérios de Aceitação

- Dado que existe um diretório `dist/` válido  
  Quando executo `azion-flow deploy dist`  
  Então:
  - o bucket é verificado ou criado automaticamente
  - os arquivos são sincronizados
  - uma aplicação edge é criada ou atualizada
  - o resultado final exibe status claro
- Em caso de erro, a mensagem deve ser explícita e acionável.

### US-001 — Priorização

Alta

### US-001 — Dependências

- Token da Azion configurado
- Diretório de build existente
- API da Azion respondendo

### US-001 — Estimativa

N/D

### US-001 — Notas

Fluxo principal do projeto. Base para tudo.

### US-001 — Rastreabilidade

- RF-001 (Deploy completo)
- UC-Deploy-001
- Philosophy: “Como resolver — CLI única para fluxo completo”

### US-001 — Histórico

- 2025-02-18: Criada

---

## US-002 — Criação automática de bucket

### US-002 — Descritivo

Como **usuário que não quer lidar com o painel da Azion**,  
eu quero **que o sistema crie automaticamente o bucket necessário**,  
para que **eu não precise navegar em configurações manuais**.

### US-002 — Critérios de Aceitação

- Se o bucket existir → deve ser reutilizado
- Se não existir → deve ser criado
- Nome do bucket deve ser consistente
- Erros devem indicar exatamente qual etapa falhou

### US-002 — Priorização

Alta

### US-002 — Dependências

- Token válido
- Permissão de criação de buckets

### US-002 — Estimativa

N/D

### US-002 — Notas

Parte crítica da automação.

### US-002 — Rastreabilidade

- RF-002
- UC-Bucket-001
- Philosophy: “Problemas — criação de bucket é manual”

### US-002 — Histórico

- 2025-02-18: Criada

---

## US-003 — Upload e sincronização de arquivos

### US-003 — Descritivo

Como **desenvolvedor**,  
eu quero **sincronizar os arquivos do diretório local com o bucket**,  
para que **o deploy reflita exatamente o que está no meu build**.

### US-003 — Critérios de Aceitação

- Apenas arquivos alterados devem ser enviados quando possível
- Remoção de arquivos obsoletos é opcional
- Erros devem indicar nome do arquivo, tamanho e causa

### US-003 — Priorização

Alta

### US-003 — Dependências

- Bucket existente
- Diretório de build válido

### US-003 — Estimativa

N/D

### US-003 — Notas

Essencial para velocidade e confiabilidade do fluxo.

### US-003 — Rastreabilidade

- RF-003
- UC-Upload-001

### US-003 — Histórico

- 2025-02-18: Criada

---

## US-004 — Criação/atualização da aplicação

### US-004 — Descritivo

Como **usuário da Azion**,  
eu quero **que a aplicação edge seja criada ou atualizada automaticamente**,  
para que **o deploy funcione sem precisar tocar no painel**.

### US-004 — Critérios de Aceitação

- Se a aplicação existir → atualizar rotas e origem
- Se não existir → criar com preset padrão
- Domínio padrão deve ser exibido ao final

### US-004 — Priorização

Alta

### US-004 — Dependências

- Bucket existente
- Config válida

### US-004 — Estimativa

N/D

### US-004 — Notas

Serve de ponte entre bucket e domínio.

### US-004 — Rastreabilidade

- RF-004
- UC-App-001

### US-004 — Histórico

- 2025-02-18: Criada

---

## US-005 — Configuração opcional de domínio

### US-005 — Descritivo

Como **usuário**,  
eu quero **vincular meu domínio à aplicação**,  
para que **meu site final rode no endereço que eu quero**.

### US-005 — Critérios de Aceitação

- Domínio informado via flag ou config
- Configuração DNS aplicada via API
- Retornar registros necessários ao usuário

### US-005 — Priorização

Média

### US-005 — Dependências

- Aplicação criada
- Domínio do usuário

### US-005 — Estimativa

N/D

### US-005 — Notas

Opcional para o deploy, essencial para o uso real.

### US-005 — Rastreabilidade

- RF-005
- UC-Domain-001

### US-005 — Histórico

- 2025-02-18: Criada

---

## US-006 — Diagnóstico final

### US-006 — Descritivo

Como **usuário**,  
eu quero **um diagnóstico claro após o deploy**,  
para que **eu veja o resultado sem interpretar logs confusos**.

### US-006 — Critérios de Aceitação

- Exibir bucket usado
- Exibir aplicação usada
- Exibir URL final
- Erros claramente separados por etapa

### US-006 — Priorização

Média

### US-006 — Dependências

- Deploy executado

### US-006 — Estimativa

N/D

### US-006 — Notas

Base da confiança no fluxo.

### US-006 — Rastreabilidade

- RF-006
- Philosophy: “Resultados esperados — feedback direto e simples”

### US-006 — Histórico

- 2025-02-18: Criada

---

## US-007 — Configuração local simples

### US-007 — Descritivo

Como **usuário**,  
eu quero **configurar meu token e opções padrão uma vez**,  
para que **não precise repetir credenciais sempre**.

### US-007 — Critérios de Aceitação

- Arquivo de config criado/validado
- Token testado antes do uso
- Erros informativos

### US-007 — Priorização

Média

### US-007 — Dependências

Nenhuma

### US-007 — Estimativa

N/D

### US-007 — Notas

Primeiro passo lógico do usuário.

### US-007 — Rastreabilidade

- RF-007
- UC-Config-001

### US-007 — Histórico

- 2025-02-18: Criada

---

## US-008 — Feedback claro em erros

### US-008 — Descritivo

Como **usuário**,  
eu quero **mensagens de erro úteis**,  
para que **eu saiba exatamente o que corrigir**.

### US-008 — Critérios de Aceitação

- Mensagens específicas
- Etapa falha identificada
- Stack traces ocultados por padrão
- Sugestão de ação possível

### US-008 — Priorização

Média

### US-008 — Dependências

Todas as outras histórias

### US-008 — Estimativa

N/D

### US-008 — Notas

Diretamente ligado à experiência do desenvolvedor (DX).

### US-008 — Rastreabilidade

- RF-008

### US-008 — Histórico

- 2025-02-18: Criada

---
