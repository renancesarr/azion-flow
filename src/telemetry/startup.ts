import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { TELEMETRY_FILE } from "./telemetry.optin";

export async function maybePromptTelemetry(cwd = process.cwd()): Promise<void> {
  if (process.env.CI === "1") return;
  if (process.env.AZION_FLOW_TELEMETRY) return;
  if (!input.isTTY) return;

  const filePath = join(cwd, TELEMETRY_FILE);
  try {
    await stat(filePath);
    return; // already decided
  } catch {
    // continue
  }

  const rl = readline.createInterface({ input, output });
  const answer = (await rl.question("Deseja ativar telemetria anônima? (y/n) "))?.trim().toLowerCase();
  rl.close();

  const enabled = answer === "y";
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify({ enabled }, null, 2), "utf-8");
}
