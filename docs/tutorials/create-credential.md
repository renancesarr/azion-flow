# Tutorial — Criar credencial (Storage) com o azion-flow

Este guia mostra como configurar uma credencial de storage na Azion usando a CLI `azion-flow`. Partimos do pressuposto de que você já tem o token da Azion e permissões adequadas.

## Pré-requisitos
- Node.js 18+
- `azion-flow` instalado (`npm i -g azion-flow`)
- Token Azion válido (solicitado pela CLI se não estiver em cache)

## Passo 1 — Verificar/ativar telemetria (opcional)
```bash
azion-flow telemetry enable   # ou disable, se preferir
```

## Passo 2 — Criar ou garantir o bucket
Se ainda não tiver um bucket, crie com um build vazio:
```bash
mkdir -p /tmp/azion-build
azion-flow deploy --build-dir /tmp/azion-build --bucket meu-bucket-demo
```

## Passo 3 — Criar credencial pela CLI
Use o comando dedicado:
```bash
azion-flow storage credentials create \
  --name minha-credencial \
  --type s3 \
  --access-key SEU_ACCESS_KEY \
  --secret-key SEU_SECRET_KEY
```
- Flags suportam `--json` para saída em JSON.

## Passo 4 — Listar credenciais
```bash
azion-flow storage credentials list
```

## Passo 5 — Usar a credencial no fluxo
- Guarde o ID/UUID retornado na criação.
- Quando for configurar storage avançado ou steps futuros, use esse ID conforme a documentação de providers reais.

## Erros comuns
- **401/403**: token inválido ou sem permissão → gere novo token ou revise escopos.
- **422**: payload inválido → confira campos obrigatórios (nome único, type suportado).
- **Rede/timeout**: tente novamente e verifique conexão.

## Próximos passos
- Integrar o ID da credencial em configs locais (`.azionflow/config.json`) quando o suporte estiver disponível.
- Acompanhar futuras versões da CLI para comando dedicado de credenciais.
