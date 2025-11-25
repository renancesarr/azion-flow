import { deployCommand } from "./commands/deploy";
import { helpCommand } from "./commands/help";
import { telemetryCommand } from "./commands/telemetry";
import { versionCommand } from "./commands/version";
import { bucketsCommand } from "./commands/storage/buckets";
import { credentialsCommand } from "./commands/storage/credentials";

export async function routeCommand(args: string[]): Promise<void> {
  const [command, ...rest] = args;

  switch (command) {
    case "deploy":
      await deployCommand(rest);
      break;
    case "storage":
      await routeStorage(rest);
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

async function routeStorage(args: string[]): Promise<void> {
  const [subcommand, ...rest] = args;
  switch (subcommand) {
    case "buckets":
      await bucketsCommand(rest);
      break;
    case "credentials":
      await credentialsCommand(rest);
      break;
    default:
      helpCommand();
      break;
  }
}
