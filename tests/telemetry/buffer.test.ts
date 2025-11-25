import { describe, it, expect } from "vitest";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { appendEvent } from "../../src/telemetry/buffer";
import { createEvent } from "../../src/telemetry/create-event";
import { TelemetryEvents } from "../../src/telemetry/events";

describe("Telemetry buffer (TTEL-006, TTEL-013)", () => {
  it("appends events to local log file", async () => {
    const dir = await mkdtemp(join(tmpdir(), "telemetry-"));
    const ev1 = createEvent(TelemetryEvents.cliStarted);
    const ev2 = createEvent(TelemetryEvents.deployFinished, { uploaded: 2 });

    await appendEvent(ev1, dir);
    await appendEvent(ev2, dir);

    const content = await readFile(join(dir, ".azionflow/events.log"), "utf-8");
    const lines = content.trim().split("\n");
    expect(lines.length).toBe(2);
    const parsed = lines.map((l) => JSON.parse(l));
    expect(parsed[0].event).toBe(TelemetryEvents.cliStarted);
    expect(parsed[1].payload.uploaded).toBe(2);
  });
});
