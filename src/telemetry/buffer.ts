import { mkdir, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { TelemetryEvent } from "./event";

const LOG_PATH = ".azionflow/events.log";

async function ensureDir(path: string): Promise<void> {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export async function bufferEvent(evt: TelemetryEvent, cwd = process.cwd()): Promise<void> {
  const filePath = join(cwd, LOG_PATH);
  await ensureDir(filePath);
  const line = JSON.stringify(evt);
  await appendFile(filePath, `${line}\n`, "utf-8");
}
