import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { TelemetryEvent } from "./event";

const BUFFER_FILE = ".azionflow/events.log";

export async function appendEvent(event: TelemetryEvent, cwd = process.cwd()): Promise<void> {
  const filePath = join(cwd, BUFFER_FILE);
  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, JSON.stringify(event) + "\n", "utf-8");
}
