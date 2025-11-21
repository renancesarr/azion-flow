import { deployCommand } from "./commands/deploy";
import { helpCommand } from "./commands/help";
import { telemetryCommand } from "./commands/telemetry";
import { versionCommand } from "./commands/version";

export async function routeCommand(args: string[]): Promise<void> {
  const [command, ...rest] = args;

  switch (command) {
    case "deploy":
      await deployCommand(rest);
      break;
    case "help":
      helpCommand();
      break;
    case "version":
      versionCommand();
      break;
    case "telemetry":
      await telemetryCommand(rest);
      break;
    default:
      helpCommand();
      break;
  }
}
