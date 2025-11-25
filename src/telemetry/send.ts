import { readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { isTelemetryEnabled } from "./telemetry.optin";

type FetchImpl = (input: string | URL, init?: { method?: string; headers?: Record<string, string>; body?: string }) => Promise<{
  ok: boolean;
  status: number;
}>;

const EVENTS_FILE = ".azionflow/events.log";

export async function sendEvents(options: { cwd?: string; endpoint?: string; fetchImpl?: FetchImpl } = {}) {
  const cwd = options.cwd ?? process.cwd();
  const endpoint = options.endpoint ?? process.env.AZION_FLOW_TELEMETRY_ENDPOINT;
  const fetchImpl: FetchImpl = options.fetchImpl ?? (globalThis.fetch as any);

  if (!(await isTelemetryEnabled(cwd))) return { sent: 0, skipped: true };
  if (!endpoint) return { sent: 0, skipped: true };
  if (!fetchImpl) return { sent: 0, skipped: true };

  let content: string;
  try {
    content = await readFile(join(cwd, EVENTS_FILE), "utf-8");
  } catch {
    return { sent: 0, skipped: true };
  }

  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return { sent: 0, skipped: true };

  const events = lines.map((line) => JSON.parse(line));
  const res = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ events })
  });

  if (!res.ok) {
    throw new Error(`Telemetry send failed: ${res.status}`);
  }

  await rm(join(cwd, EVENTS_FILE));
  return { sent: events.length, skipped: false };
}
