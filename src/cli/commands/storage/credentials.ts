import { AzionCredentialsProvider } from "../../../domains/storage/azion.credentials";
import { setTokenDirect, promptTokenIfNeeded } from "../../utils/token-prompt";
import { getToken } from "../../../core/http/token-store";
import { renderTable } from "../../utils/table";
import type { AzionCredentialDto } from "../../../domains/storage/dto/credential.dto";

type CredFlags = {
  json: boolean;
  token?: string;
  name?: string;
  type?: string;
  accessKey?: string;
  secretKey?: string;
};

function parseFlag(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return undefined;
}

function parseCredFlags(args: string[]): CredFlags {
  return {
    json: args.includes("--json"),
    token: parseFlag(args, "--token"),
    name: parseFlag(args, "--name"),
    type: parseFlag(args, "--type"),
    accessKey: parseFlag(args, "--access-key"),
    secretKey: parseFlag(args, "--secret-key")
  };
}

async function resolveProvider(flags: CredFlags) {
  if (flags.token) setTokenDirect(flags.token);
  await promptTokenIfNeeded();
  const token = getToken();
  if (!token) throw new Error("AZION_TOKEN ausente.");
  return new AzionCredentialsProvider({ token });
}

export async function credentialsCommand(args: string[]): Promise<void> {
  const [action, ...rest] = args;
  const flags = parseCredFlags(rest);
  const provider = await resolveProvider(flags);

  if (action === "list") {
    const creds = await provider.listCredentials();
    if (flags.json) {
      console.log(JSON.stringify(creds, null, 2));
    } else {
      const rows = creds.map((c) => [c.name ?? "n/a", c.id ?? "", c.type ?? ""]);
      console.log(renderTable([["name", "id", "type"], ...rows]));
    }
    return;
  }

  if (action === "create") {
    const name = flags.name;
    if (!name) throw new Error("Uso: azion-flow storage credentials create --name <name> --type <type> --access-key <key> --secret-key <key>");
    const input: AzionCredentialDto = {
      name,
      type: flags.type,
      access_key: flags.accessKey,
      secret_key: flags.secretKey
    };
    const cred = await provider.createCredential(input);
    if (flags.json) {
      console.log(JSON.stringify(cred, null, 2));
    } else {
      console.log(renderTable([["name", "id", "type"], [cred.name, cred.id ?? "", cred.type ?? ""]]));
    }
    return;
  }

  throw new Error("Uso: azion-flow storage credentials <list|create> [args]");
}
