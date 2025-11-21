import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const TELEMETRY_ENV = "AZION_FLOW_TELEMETRY";
const TELEMETRY_DIR = ".azionflow";
const TELEMETRY_FILE = "telemetry.json";

type TelemetryConfig = {
  enabled?: boolean;
};

async function readConfig(cwd: string): Promise<TelemetryConfig | null> {
  const filePath = join(cwd, TELEMETRY_DIR, TELEMETRY_FILE);
  if (!existsSync(filePath)) return null;
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as TelemetryConfig;
  } catch {
    return null;
  }
}

export async function isTelemetryEnabled(cwd = process.cwd()): Promise<boolean> {
  const envFlag = process.env[TELEMETRY_ENV];
  if (envFlag === "1" || envFlag?.toLowerCase() === "true") return true;
  if (envFlag === "0" || envFlag?.toLowerCase() === "false") return false;

  const config = await readConfig(cwd);
  return Boolean(config?.enabled);
}
