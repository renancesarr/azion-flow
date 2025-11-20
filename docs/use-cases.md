# Use Cases — azion-flow

Documento descrevendo os principais casos de uso do sistema, alinhados às User Stories, Requisitos Funcionais e Não Funcionais. Todos os headings seguem padrão livre de duplicação conforme regras do markdownlint.

---

## 1. Core Deployment Flows

---

### UC-001 — Execução de Deploy Completo

#### UC-001.1 Identificação

**ID:** UC-001  
**Atores:** Usuário (dev), Sistema azion-flow, API da Azion

#### UC-001.2 Descrição

Executa o processo completo de deploy do site estático através de um único comando, orquestrando todas as etapas internas.

#### UC-001.3 Pré-condições

- Token Azion configurado corretamente
- Diretório de build existente
- Conexão estável
- Conta válida

#### UC-001.4 Pós-condições

- Deploy finalizado
- Application criada/atualizada
- Bucket atualizado
- Relatório exibido

#### UC-001.5 Fluxo Principal

1. Usuário executa `azion-flow deploy <caminho>`
2. Sistema valida token
3. Sistema verifica bucket
4. Cria bucket se necessário
5. Sincroniza arquivos
6. Cria/atualiza application
7. Configura domínio (opcional)
8. Exibe relatório

#### UC-001.6 Fluxos Alternativos

- Token inválido
- Bucket inacessível
- Upload falhou
- Application não criada

#### UC-001.7 Requisitos Relacionados

- RF-001, RF-002, RF-003, RF-004, RF-005, RF-006
- RNF-001, RNF-002, RNF-003, RNF-007

---

### UC-002 — Criação ou Reutilização de Bucket

#### UC-002.1 Descrição

Determina se o bucket existe e, se não existir, cria um automaticamente.

#### UC-002.2 Pré-condições

- Token válido
- Permissões adequadas

#### UC-002.3 Pós-condições

- Bucket referenciado e pronto

#### UC-002.4 Fluxo Principal

1. Listar buckets
2. Verificar existência
3. Criar se necessário
4. Retornar ID

#### UC-002.5 Fluxos Alternativos

- Falha de permissão
- Nome inválido

#### UC-002.6 Requisitos Relacionados

- RF-002
- RNF-002, RNF-003, QA-008

---

### UC-003 — Sincronização de Arquivos

#### UC-003.1 Descrição

Atualiza o bucket com base no diretório de build.

#### UC-003.2 Pré-condições

- Bucket existe
- Diretório válido

#### UC-003.3 Pós-condições

- Bucket igual ao build

#### UC-003.4 Fluxo Principal

1. Escanear diretório
2. Calcular diferenças
3. Enviar alterados
4. Remover obsoletos

#### UC-003.5 Fluxos Alternativos

- Falha no upload
- Arquivo inacessível

#### UC-003.6 Requisitos Relacionados

- RF-003
- RNF-001, RNF-002, QA-007

---

## 2. Application & Domain Management

---

### UC-004 — Criar ou Atualizar Application

#### UC-004.1 Descrição

Cria uma nova aplicação ou atualiza a existente com origem no bucket.

#### UC-004.2 Pré-condições

- Bucket válido

#### UC-004.3 Pós-condições

- Application apontando para bucket

#### UC-004.4 Fluxo Principal

1. Consultar applications
2. Criar ou atualizar
3. Retornar ID + endpoint

#### UC-004.5 Fluxos Alternativos

- Falha no update
- Falha no create

#### UC-004.6 Requisitos Relacionados

- RF-004
- RNF-002, RNF-007

---

### UC-005 — Configurar Domínio

#### UC-005.1 Descrição

Associa domínio customizado à aplicação.

#### UC-005.2 Pré-condições

- Application existente
- Domínio válido

#### UC-005.3 Pós-condições

- DNS configurado

#### UC-005.4 Fluxo Principal

1. Receber domínio
2. Enviar configuração
3. Receber registros DNS
4. Exibir instruções

#### UC-005.5 Fluxos Alternativos

- Domínio inválido
- Falha de associação

#### UC-005.6 Requisitos Relacionados

- RF-005
- RNF-008, QA-002

---

## 3. Output & Diagnostics

---

### UC-006 — Exibir Relatório Final

#### UC-006.1 Descrição

Exibe resumo completo do deploy.

#### UC-006.2 Pré-condições

- Deploy executado

#### UC-006.3 Pós-condições

- Relatório entregue

#### UC-006.4 Fluxo Principal

1. Coletar dados das etapas
2. Gerar saída
3. Exibir na tela

#### UC-006.5 Requisitos Relacionados

- RF-006
- RNF-003, RNF-007

---

### UC-007 — Exibir Erros Claros

#### UC-007.1 Descrição

Mostra erros com contexto e causa.

#### UC-007.2 Pré-condições

- Erro em qualquer etapa

#### UC-007.3 Pós-condições

- Mensagem clara para o usuário

#### UC-007.4 Fluxo Principal

1. Capturar exceção
2. Mapear origem
3. Exibir mensagem formatada

#### UC-007.5 Fluxos Alternativos

- Erro inesperado → fallback padrão

#### UC-007.6 Requisitos Relacionados

- RF-008
- RNF-003, QA-002

---

## 4. Configurations & Foundations

---

### UC-008 — Gerenciar Configurações Locais

#### UC-008.1 Descrição

Gerencia token, presets e configurações persistentes.

#### UC-008.2 Pré-condições

- Usuário fornece informações

#### UC-008.3 Pós-condições

- Arquivo de config válido

#### UC-008.4 Fluxo Principal

1. Receber token
2. Validar
3. Salvar config
4. Confirmar ao usuário

#### UC-008.5 Fluxos Alternativos

- Token inválido
- Arquivo corrompido

#### UC-008.6 Requisitos Relacionados

- RF-007
- RNF-001, SEC-001, QA-003

---
