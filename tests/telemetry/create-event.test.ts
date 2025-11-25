import { describe, it, expect } from "vitest";
import { createEvent } from "../../src/telemetry/create-event";
import { TelemetryEvents } from "../../src/telemetry/events";

describe("Telemetry createEvent (TTEL-004, TTEL-005, TTEL-012)", () => {
  it("builds event with metadata and payload", () => {
    const ev = createEvent(TelemetryEvents.cliStarted, { foo: "bar" });
    expect(ev.event).toBe(TelemetryEvents.cliStarted);
    expect(ev.payload?.foo).toBe("bar");
    expect(typeof ev.timestamp).toBe("string");
    expect(ev.node.startsWith("v")).toBe(true);
    expect(ev.os.length).toBeGreaterThan(1);
  });
});
