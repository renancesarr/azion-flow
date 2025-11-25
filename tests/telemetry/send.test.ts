import { describe, it, expect, afterEach } from "vitest";
import { mkdtemp, writeFile, readFile, rm, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { sendEvents } from "../../src/telemetry/send";

describe("Telemetry send (TTEL-007, TTEL-014)", () => {
  const originalEnv = { ...process.env };

  afterEach(async () => {
    process.env = { ...originalEnv };
  });

  it("sends events and clears log on success", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tel-send-"));
    process.env.AZION_FLOW_TELEMETRY = "1";
    const endpoint = "https://telemetry.example/ingest";
    const eventsDir = join(dir, ".azionflow");
    await mkdir(eventsDir, { recursive: true });
    const eventsPath = join(eventsDir, "events.log");
    await writeFile(eventsPath, JSON.stringify({ event: "cli_started" }) + "\n", "utf-8");

    const fetchMock = async () => ({ ok: true, status: 200 }) as any;
    const res = await sendEvents({ cwd: dir, endpoint, fetchImpl: fetchMock });
    expect(res.sent).toBe(1);
    await expect(readFile(eventsPath, "utf-8")).rejects.toBeDefined();
  });

  it("retains log on failure", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tel-send-"));
    process.env.AZION_FLOW_TELEMETRY = "1";
    const endpoint = "https://telemetry.example/ingest";
    const eventsDir = join(dir, ".azionflow");
    await mkdir(eventsDir, { recursive: true });
    const eventsPath = join(eventsDir, "events.log");
    await writeFile(eventsPath, JSON.stringify({ event: "cli_started" }) + "\n", "utf-8");

    const fetchMock = async () => ({ ok: false, status: 500 }) as any;
    await expect(sendEvents({ cwd: dir, endpoint, fetchImpl: fetchMock })).rejects.toThrow("Telemetry send failed");
    const content = await readFile(eventsPath, "utf-8");
    expect(content.trim().length).toBeGreaterThan(0);
    await rm(eventsPath);
  });
});
