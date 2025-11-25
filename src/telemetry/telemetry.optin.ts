import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const TELEMETRY_FILE = ".azionflow/telemetry.json";

export async function isTelemetryEnabled(cwd = process.cwd()): Promise<boolean> {
  const envFlag = process.env.AZION_FLOW_TELEMETRY;
  if (envFlag === "1" || envFlag === "true") return true;
  if (envFlag === "0" || envFlag === "false") return false;

  try {
    const file = await readFile(join(cwd, TELEMETRY_FILE), "utf-8");
    const parsed = JSON.parse(file);
    return parsed?.enabled === true;
  } catch {
    return false;
  }
}
