import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const TELEMETRY_PATH = ".azionflow/telemetry.json";

async function saveConfig(enabled: boolean, cwd = process.cwd()): Promise<void> {
  const filePath = join(cwd, TELEMETRY_PATH);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify({ enabled }, null, 2), "utf-8");
}

export async function telemetryCommand(args: string[], cwd = process.cwd()): Promise<void> {
  const action = args[0];
  if (action === "enable") {
    await saveConfig(true, cwd);
    return;
  }
  if (action === "disable") {
    await saveConfig(false, cwd);
    return;
  }
  throw new Error('Usage: azion-flow telemetry <enable|disable>');
}
