# Contribuindo para o azion-flow

Obrigado por ajudar a melhorar o projeto! Siga estas diretrizes para manter o fluxo simples e previsível.

## Como rodar local

```bash
npm install
npm test
npm run build
```

## Testes

- Execute `npm test` antes de abrir PR.
- Prefira testes unitários curtos em `tests/`.

## Commits

- Mensagens curtas e descritivas (imperativo): `Add deploy docs`, `Fix token validation`.
- Um commit por mudança coesa.

## Estilo de código

- TypeScript com `strict` ligado.
- Evite dependências de DOM em Node.
- Comentários apenas quando necessário para clareza.

## Fluxo de PR

1. Crie branch a partir de `main`.
2. Faça commits pequenos e bem descritos.
3. Abra PR com descrição do que mudou e testes rodados.
4. Aguarde revisão; responda a feedbacks rapidamente.

## Estrutura útil do repo

- `src/cli`: comandos e utilidades.
- `src/usecases`: orquestradores e steps.
- `src/domain`: serviços e lógica de negócio.
- `src/providers`: integrações Azion e infraestrutura.
- `docs/`: guias de usuário, arquitetura e referência.
- `examples/`: casos de uso práticos.

## Reportar issues

- Inclua passos de reprodução, versão do Node, sistema operacional e logs.
- Se for bug de rede/credencial, remova dados sensíveis antes de anexar logs.
