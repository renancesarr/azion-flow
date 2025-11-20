# Functional Requirements — azion-flow
Requisitos funcionais da Fase 1, escritos em padrão IEEE/INCOSE, diretamente rastreáveis às User Stories e vinculados aos RNFs.

---

## RF-001 — Execução de deploy completo

### RF-001.1 Statement
The system shall perform a full static-site deployment using a single command, automatically executing all required steps (bucket validation/creation, file synchronization, application creation/update, and final reporting).

### RF-001.2 Rationale
Usuários desejam reduzir o fluxo manual e repetitivo do deploy na Azion. Esse requisito encapsula o valor central do azion-flow: transformar um processo fragmentado em uma operação única, previsível e confiável.

### RF-001.3 Acceptance Criteria
- **Given** a valid build directory  
  **When** the user runs `azion-flow deploy <path>`  
  **Then** the system shall:
  - verificar ou criar um bucket  
  - sincronizar arquivos  
  - criar ou atualizar a aplicação edge  
  - retornar URL final ou erro claro  
- código de saída 0 em caso de sucesso  
- código não-zero em caso de erro  

### RF-001.4 Verification Method
- **Demonstration** do fluxo completo  
- **Test** automatizado (mock da API)  
- **Inspection** dos logs gerados

### RF-001.5 Related Non-Functional Requirements
- RNF-001 — Simplicidade de Uso  
- RNF-002 — Confiabilidade  
- RNF-003 — Observabilidade  
- RNF-007 — Previsibilidade de Saída  
- QA-001/QA-003/QA-004  

### RF-001.6 More Information
Ligado diretamente à US-001.  
Base estrutural de todos os outros requisitos.

### RF-001.7 History
- 2025-02-18 — Criado

---

## RF-002 — Criação automática de bucket

### RF-002.1 Statement
The system shall automatically create a bucket if it does not exist and reuse it if it already exists.

### RF-002.2 Rationale
A criação manual de bucket é uma das maiores fricções no deploy estático da Azion. Automatizar essa decisão elimina erros comuns e acelera o fluxo.

### RF-002.3 Acceptance Criteria
- se o bucket existir → reutilizar  
- se não existir → criar com nome padronizado  
- mensagens devem indicar claramente a ação tomada  
- erros devem identificar o problema (ex.: permissão, nome inválido)

### RF-002.4 Verification Method
- **Test** por simulação  
- **Inspection** do nome gerado  

### RF-002.5 Related Non-Functional Requirements
- RNF-002 — Confiabilidade  
- RNF-003 — Observabilidade  
- SR-001 — Estado Consistente  
- QA-008 — Consistência  

### RF-002.6 More Information
US-002; depende conceitualmente do RF-007.

### RF-002.7 History
- 2025-02-18 — Criado

---

## RF-003 — Sincronização de arquivos

### RF-003.1 Statement
The system shall synchronize the local build directory with the remote bucket, uploading changed files and optionally removing obsolete ones.

### RF-003.2 Rationale
Sem sincronização correta, o deploy fica inconsistente. Esse passo garante que o conteúdo publicado seja idêntico ao build local.

### RF-003.3 Acceptance Criteria
- upload apenas de arquivos alterados  
- remoção opcional de arquivos obsoletos  
- erros exibem o arquivo causador  
- relatórios exibem quantidade enviada

### RF-003.4 Verification Method
- **Test** com diretórios artificiais  
- **Analysis** de checksums  
- **Inspection** de logs

### RF-003.5 Related Non-Functional Requirements
- RNF-001 — Simplicidade  
- RNF-002 — Confiabilidade  
- QA-007 — Robustez  
- PR-002 — Economia de recursos

### RF-003.6 More Information
Relacionado à US-003.

### RF-003.7 History
- 2025-02-18 — Criado

---

## RF-004 — Criação/atualização da application

### RF-004.1 Statement
The system shall create a new Azion application or update an existing one using default static-site configurations.

### RF-004.2 Rationale
Criar/atualizar a aplicação manualmente é um processo detalhado e fácil de errar. Automatizar isso permite reprodutibilidade e reduz risco.

### RF-004.3 Acceptance Criteria
- se a aplicação existir → atualizar origem/rota  
- se não existir → criar com preset padrão  
- retorno deve mostrar ID e endpoint

### RF-004.4 Verification Method
- **Demonstration**  
- **Test** com mock HTTP

### RF-004.5 Related Non-Functional Requirements
- RNF-002 — Confiabilidade  
- RNF-007 — Previsibilidade  
- QA-004 — Extensibilidade

### RF-004.6 More Information
Relacionado à US-004.

### RF-004.7 History
- 2025-02-18 — Criado

---

## RF-005 — Configuração opcional de domínio

### RF-005.1 Statement
The system shall allow the user to configure a custom domain during deploy if a domain is provided.

### RF-005.2 Rationale
Domínio próprio é essencial no mundo real, mas não obrigatório. A configuração opcional mantém flexibilidade.

### RF-005.3 Acceptance Criteria
- domínio informado via flag ou config  
- API chamada apenas quando domínio existe  
- sistema deve retornar registros DNS necessários  

### RF-005.4 Verification Method
- **Demonstration**
- **Inspection**

### RF-005.5 Related Non-Functional Requirements
- RNF-008 — Ambiente controlado  
- QA-002 — Usabilidade  
- QA-008 — Consistência  

### RF-005.6 More Information
Relacionado à US-005.

### RF-005.7 History
- 2025-02-18 — Criado

---

## RF-006 — Diagnóstico final do deploy

### RF-006.1 Statement
The system shall provide a structured final summary describing the result of the deployment.

### RF-006.2 Rationale
Feedback claro aumenta confiança e reduz erros. Essencial para DX.

### RF-006.3 Acceptance Criteria
Deve exibir:
- bucket utilizado  
- arquivos enviados  
- aplicação usada  
- URL final  
- erros agrupados por etapa  

### RF-006.4 Verification Method
- **Inspection**  
- **Test**

### RF-006.5 Related Non-Functional Requirements
- RNF-003 — Observabilidade  
- RNF-007 — Previsibilidade  
- QA-001 — Confiabilidade

### RF-006.6 More Information
Relacionado à US-006.

### RF-006.7 History
- 2025-02-18 — Criado

---

## RF-007 — Configuração local

### RF-007.1 Statement
The system shall allow the user to configure authentication and default options in a local config file.

### RF-007.2 Rationale
Evita repetição de inputs e facilita uso contínuo.

### RF-007.3 Acceptance Criteria
- salvar token  
- validar token  
- armazenar configs  
- erros claros  

### RF-007.4 Verification Method
- **Test**
- **Inspection**

### RF-007.5 Related Non-Functional Requirements
- SEC-001 — Proteção do token  
- RNF-001 — Simplicidade  
- QA-003 — Manutenibilidade  

### RF-007.6 More Information
Relacionado à US-007.

### RF-007.7 History
- 2025-02-18 — Criado

---

## RF-008 — Mensagens de erro claras

### RF-008.1 Statement
The system shall present clear, contextualized, and human-readable error messages.

### RF-008.2 Rationale
Erros genéricos reduzem confiança e dificultam uso.

### RF-008.3 Acceptance Criteria
- identificar etapa falha  
- não mostrar stack traces brutos  
- sugerir ação quando possível  

### RF-008.4 Verification Method
- **Inspection**
- **Demonstration**

### RF-008.5 Related Non-Functional Requirements
- RNF-003 — Observabilidade  
- QA-002 — Usabilidade  
- QA-008 — Consistência  

### RF-008.6 More Information
Relacionado à US-008.

### RF-008.7 History
- 2025-02-18 — Criado

---
