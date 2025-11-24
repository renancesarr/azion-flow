# Instalação — azion-flow

## Requisitos

- Node.js 18 ou superior.
- Acesso à internet para comunicar com a Azion.
- Permissão para instalar binários globais (ou use `npx`).

## Instalar

```bash
npm i -g azion-flow
```

## Atualizar

```bash
npm update -g azion-flow
# ou instalar versão específica
npm i -g azion-flow@latest
```

## Desinstalar

```bash
npm rm -g azion-flow
```

## Troubleshooting

- **Permissão negada ao instalar**: prefira `nvm` ou ajuste seu prefix global (`npm config set prefix ~/.npm-global`).
- **Node antigo**: atualize para 18+ (LTS) e repita a instalação.
- **Proxy/rede**: valide `npm ping` e configure `npm config set proxy http://...` se necessário.
