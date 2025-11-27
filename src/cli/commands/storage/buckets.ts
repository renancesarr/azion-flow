import { AzionStorageProvider } from "../../../domains/storage/services/azion.storage";
import { setTokenDirect, promptTokenIfNeeded } from "../../utils/token-prompt";
import { getToken } from "../../../core/http/token-store";
import { renderTable } from "../../utils/table";

type BucketCommandFlags = {
  json: boolean;
  token?: string;
};

function parseFlags(args: string[]): BucketCommandFlags {
  return {
    json: args.includes("--json"),
    token: parseFlag(args, "--token")
  };
}

function parseFlag(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return undefined;
}

async function resolveProvider(flags: BucketCommandFlags) {
  if (flags.token) setTokenDirect(flags.token);
  await promptTokenIfNeeded();
  const token = getToken();
  if (!token) throw new Error("AZION_TOKEN ausente.");
  return new AzionStorageProvider({ token });
}

export async function bucketsCommand(args: string[]): Promise<void> {
  const [action, ...rest] = args;
  const flags = parseFlags(rest);
  const provider = await resolveProvider(flags);

  if (action === "list") {
    const buckets = await provider.listBuckets();
    if (flags.json) {
      console.log(JSON.stringify(buckets, null, 2));
    } else {
      const rows = buckets.map((b) => [b.name ?? "n/a", b.id ?? ""]);
      console.log(renderTable([["name", "id"], ...rows]));
    }
    return;
  }

  if (action === "create") {
    const name = rest.find((a) => !a.startsWith("--"));
    if (!name) throw new Error("Uso: azion-flow storage buckets create <name> [--json] [--token <token>]");
    const bucket = await provider.ensureBucket(name);
    if (flags.json) {
      console.log(JSON.stringify(bucket, null, 2));
    } else {
      console.log(renderTable([["name", "id"], [bucket.name ?? name, bucket.id ?? ""]]));
    }
    return;
  }

  throw new Error("Uso: azion-flow storage buckets <list|create> [args]");
}
