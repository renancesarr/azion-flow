# Tutorial — Criar um bucket com o azion-flow

Este guia mostra como criar um bucket na Azion usando a CLI `azion-flow`. Os passos incluem obtenção do token, habilitar telemetria opcional, e rodar o comando de deploy apenas para garantir a criação do bucket.

## Pré-requisitos

- Node.js 18+ instalado.
- Conta na Azion com permissão para criar buckets.
- Token da Azion (será solicitado pela CLI caso não esteja em cache).

## Passo a passo

1. **Instale a CLI (se ainda não tiver)**

   ```bash
   npm i -g azion-flow
   ```

2. **(Opcional) Ative telemetria anônima**

   ```bash
   azion-flow telemetry enable
   ```

   Se preferir desativar: `azion-flow telemetry disable`.

3. **Prepare um diretório de build vazio**
   Crie uma pasta para o deploy inicial (pode estar vazia, será usada apenas para criar o bucket):

   ```bash
   mkdir -p /tmp/azion-build
   ```

4. **Execute o deploy para criar o bucket**
   Use o comando de deploy apontando para o diretório vazio e o nome desejado do bucket:

   ```bash
   azion-flow deploy --build-dir /tmp/azion-build --bucket meu-bucket-demo
   ```

   - Na primeira execução, a CLI pedirá o `AZION_TOKEN`. Cole o token e confirme.
   - A CLI criará o bucket se ele não existir e retornará um resumo.

5. **Verifique o resumo**
   Ao final, você verá algo como:

   ```text
   Resumo do deploy
   Bucket      meu-bucket-demo
   App         n/a
   Domain      n/a
   Uploaded    0
   Skipped     0
   ```

6. **Modo JSON (opcional)**
   Para usar em automação/CI:

   ```bash
   azion-flow deploy --build-dir /tmp/azion-build --bucket meu-bucket-demo --json
   ```

   Isso retorna um JSON com o status do bucket e estatísticas de envio.

7. **Erros comuns**
   - Token inválido: gere um novo token na Azion e rode novamente o comando.
   - Permissão negada: verifique se o token tem permissão para criar buckets.
   - Nome de bucket inválido: use apenas minúsculas, hífens e números (ex.: `meu-bucket-01`).

## Limpeza

Se quiser remover a pasta usada para o build:

```bash
rm -rf /tmp/azion-build
```

## Próximos passos

- Sincronizar arquivos reais: coloque seus estáticos em `--build-dir` e rode o deploy novamente.
- Configurar domínio: adicione `--domain example.com` no comando de deploy.
