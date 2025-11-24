export function helpCommand(): void {
  const helpText = `
azion-flow — CLI

Comandos:
  deploy              Executa o fluxo de deploy
  help                Exibe esta ajuda
  telemetry           Ativa/desativa telemetria (se configurada)

Flags globais:
  --help              Mostra ajuda
  --json              Saída em JSON (deploy)
  --silent            Suprime logs de steps
  --no-color          Desativa cores
  --debug             Ativa logs de debug
`;
  // eslint-disable-next-line no-console
  console.log(helpText.trim());
}
