import { describe, it, expect, afterEach } from "vitest";
import { mkdtemp, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { isTelemetryEnabled } from "../../src/telemetry/telemetry.optin";

describe("Telemetry opt-in (TTEL-001, TTEL-011)", () => {
  afterEach(() => {
    delete process.env.AZION_FLOW_TELEMETRY;
  });

  it("respects env override", async () => {
    process.env.AZION_FLOW_TELEMETRY = "1";
    expect(await isTelemetryEnabled()).toBe(true);
    process.env.AZION_FLOW_TELEMETRY = "0";
    expect(await isTelemetryEnabled()).toBe(false);
  });

  it("reads telemetry file when present", async () => {
    const dir = await mkdtemp(join(tmpdir(), "telemetry-"));
    const filePath = join(dir, ".azionflow/telemetry.json");
    await mkdir(join(dir, ".azionflow"), { recursive: true });
    await writeFile(filePath, JSON.stringify({ enabled: true }), "utf-8");
    expect(await isTelemetryEnabled(dir)).toBe(true);
  });

  it("defaults to disabled when missing", async () => {
    const dir = await mkdtemp(join(tmpdir(), "telemetry-"));
    expect(await isTelemetryEnabled(dir)).toBe(false);
  });
});
